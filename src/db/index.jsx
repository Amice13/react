// Quick creation of hashcode
const sha256 = async (source) => {
  const sourceBytes = new TextEncoder().encode(source)
  const digest = await crypto.subtle.digest('SHA-256', sourceBytes)
  const resultBytes = [...new Uint8Array(digest)]
  return resultBytes.map(x => x.toString(16).padStart(2, '0')).join('')
}

// Listen to change of data
const target = new EventTarget()
let requestChange
if (window.Retool) {
  window.Retool.subscribe((model) => {
    // Skip data changes if the new request is set
    if (requestChange) return false
    if (model.results.length) {
      let { hash, data } = model.results[model.results.length - 1]
      target.dispatchEvent(new CustomEvent(hash, { detail: data }))
    }
  })
}

// Default preparation of the query
const prepareQuery = async (method, table, query) => {
  const hash = await sha256(table + JSON.stringify(query))
  requestChange = true
  window.Retool.modelUpdate({ method, table, query, hash })
  requestChange = false
  window.Retool.triggerQuery('Playbook_Trigger')
  return true
}

// Database definition
const db = {
  get (table, query) {
    if (!window.Retool) return false
    return new Promise(async (resolve, reject) => {
      await prepareQuery('GET', table, query)
      target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
    })
  },
  post (table, query) {
    if (!window.Retool) return false
    return new Promise(async (resolve, reject) => {
      await prepareQuery('POST', table, query)
      target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
    })
  },
  patch (table, query) {
    if (!window.Retool) return false
    return new Promise(async (resolve, reject) => {
      await prepareQuery('PATCH', table, query)
      target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
    })
  },
  delete (table, query) {
    if (!window.Retool) return false
    return new Promise(async (resolve, reject) => {
      await prepareQuery('DELETE', table, query)
      target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
    })
  },
  search (table, query) {
    if (!window.Retool) return false
    return new Promise(async (resolve, reject) => {
      await prepareQuery('SEARCH', table, query)
      target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
    })
  }
}

window.db = db
