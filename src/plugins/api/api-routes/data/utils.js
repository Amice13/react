// List of collections
let dbCollections

export const checkCollection = function (db, collectionName) {
  if (!dbCollections) dbCollections = db.tables.map(el => el.name)
  if (!collectionName || !dbCollections.includes(collectionName)) {
    return { status: 'fail', data: { errors: [{ message: 'This collection does not exist' }] }}
  }
  return { status: 'success', data: { messages: [{ message: 'This collection exists'}] }}
}

const proxyFn = {
  get (target, prop) {
    let i = prop.indexOf('.')
    if (i === -1) return target[prop]
    const key1 = prop.slice(0, i)
    const key2 = prop.slice(i + 1)
    if (typeof target === 'undefined') return undefined
    if (typeof target[key1] === 'undefined') return undefined
    if (Array.isArray(target[key1])) return target[key1].map(el => new Proxy(el, proxyFn)[key2]).flat()
    return new Proxy(target[key1], proxyFn)[key2]
  }
}

export const prepareFilter = function (db, request) {
  let { filters, query, sort, sortOrder } = request ? request : {}

  // Get all indiecies of the table to utilize them
  let indicies = db.schema.indexes.map(el => el.name)
  // Filter data
  if (filters) {
    let entries = Object.entries(filters)
    if (entries.length > 0) {
      let usedIndex = false
      // We want to use at least one index if it is available
      for (let [key, value] of entries) {
        if (usedIndex) continue
        if (!indicies.includes(key)) continue
        db = Array.isArray(value) ? db.where(key).anyOf(value) : db.where({ [key]: value })
        usedIndex = key
      }
      // Match filter
      db = db.filter(el => {
        for (let [key, value] of entries) {
          // We have already filtered by the indexed field
          if (key !== usedIndex) {
            let currentValue = new Proxy(el, proxyFn)[key]
            if (Array.isArray(value) && !value.includes(currentValue)) return false
            if (!Array.isArray(value) && value !== currentValue) return false
          }
        }
        return true
      })
    }
  }

  // Process the full-text query
  if (query) {
    let [key, value] = Object.entries(query)[0]
    if (value) {
      // Make a safe pattern
      let regexPattern = new RegExp(value.replace(/[^a-zа-яєіїґ\d ]/ig, ''), 'i')
      db = db.filter(el => {
        const currentValue = key.split(/\./g).reduce((obj, key) => obj[key], el)
        return regexPattern.test(currentValue)
      })      
    }
  }
  return db
}

export const prepareSort = function (db, request) {
  const { sort, sortOrder } = request ? request : {}
  if (sort) {
    // If the field is indexed and the index is not used for the filtering, then we want to utize the index
    if (typeof db.orderBy !== 'undefined' && indicies.includes(sort)) {
      if (indicies.includes(sort)) db = db.orderBy(sort)
      if (sortOrder === 'desc') db = db.reverse()
    } else {
      if (sortOrder === 'desc') db = db.reverse()
      db = db.sortBy(sort)
    }
  }
  return db
}

export default {}