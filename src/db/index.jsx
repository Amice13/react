// // Quick creation of hashcode
// const sha256 = async (source) => {
//   const sourceBytes = new TextEncoder().encode(source)
//   const digest = await crypto.subtle.digest('SHA-256', sourceBytes)
//   const resultBytes = [...new Uint8Array(digest)]
//   return resultBytes.map(x => x.toString(16).padStart(2, '0')).join('')
// }

// // Initial settings
// let version = '0.2'

// const setInitialData = (model) => {
//   const appVersion = localStorage.getItem('appVersion')
//   if (appVersion && appVersion === version) return false
//   localStorage.setItem('user', JSON.stringify(model.user))  
//   localStorage.setItem('appVersion', version)
// }

// // Listen to change of data
// const target = new EventTarget()
// let requestChange

// if (window.Retool) {
//   window.Retool.subscribe((model) => {
//     setInitialData(model)
//     // Skip data changes if the new request is set
//     if (requestChange) return false
//     if (Object.keys(model.results).length) {
//       for (let [hash, data] of Object.entries(model.results)) {
//         console.log(hash, data)
//         target.dispatchEvent(new CustomEvent(hash, { detail: { data } }))
//       }
//     }
//   })
// }

// let lock = undefined
// let resolver = undefined

// // Default preparation of the query
// const prepareQuery = async (method, table, query) => {
//   const hash = await sha256(table + JSON.stringify(query))
//   requestChange = true

//   window.Retool.modelUpdate({ method, table, query, hash })

//   requestChange = false
//   window.Retool.triggerQuery('Playbook_Trigger')
//   return hash
// }

// // Database definition
// const db = {
//   get (table, query) {
//     if (!window.Retool) return false
//     return new Promise(async (resolve, reject) => {
//       const hash = await prepareQuery('GET', table, query)
//       target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
//     })
//   },
//   post (table, query) {
//     if (!window.Retool) return false
//     return new Promise(async (resolve, reject) => {
//       const hash = await prepareQuery('POST', table, query)
//       target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
//     })
//   },
//   patch (table, query) {
//     if (!window.Retool) return false
//     return new Promise(async (resolve, reject) => {
//       const hash = await prepareQuery('PATCH', table, query)
//       target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
//     })
//   },
//   delete (table, query) {
//     if (!window.Retool) return false
//     return new Promise(async (resolve, reject) => {
//       const hash = await prepareQuery('DELETE', table, query)
//       target.addEventListener(hash, (e) => { resolve(e.detail.data) }, { once: true })      
//     })
//   },
//   search (table, query) {
//     if (!window.Retool) return false
//     return new Promise(async (resolve, reject) => {
//       if (typeof lock === 'object') {
//         console.log('await lock table', table)
//         await lock
//         lock = undefined
//       }
//       console.log(table, ' lock is set')
//       lock = new Promise((resolve) => {
//         resolver = resolve
//       })

//       console.log(table, ' hash is created')
//       const hash = await prepareQuery('SEARCH', table, query)

//       target.addEventListener(hash, (e) => {
//         console.log(table, ' hash is resolved')
//         resolver()
//         resolve(e.detail.data)
//       }, { once: true })      
//     })
//   }
// }

// export default db
