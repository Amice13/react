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
    console.log('subscribe fires')
    if (requestChange) return false
    if (model.results.length) {
      let { hash, data } = model.results[model.results.length - 1]
      console.log('data', data)
      target.dispatchEvent(new CustomEvent(hash, { detail: data }))
    }
  })
}

const db = {
  search (table, query) {
    if (!window.Retool) return false
    return new Promise(async (resolve, reject) => {
      const hash = await sha256(table + JSON.stringify(query))
      requestChange = true
      window.Retool.modelUpdate({ method: 'SEARCH', table, query, hash })
      requestChange = false
      window.Retool.triggerQuery('Playbook_Trigger')
      target.addEventListener(hash, (e) => { console.log(e); resolve(e.detail.data) }, { once: true })      
    })
  }
}

window.db = db
