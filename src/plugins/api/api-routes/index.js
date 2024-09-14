// Function to set object values with dot notation (slashes instead of dots)
const setValue = (object, path, value) => {
  let way = path.split('/')
  let last = way.pop()
  way.reduce(function (o, k, i, kk) {
      return o[k] = o[k] || (isFinite(i + 1 in kk ? kk[i + 1] : last) ? [] : {})
  }, object)[last] = value
}

// Read all functions in subfolders
const source = import.meta.glob(['./*/*.js'], { eager: true, import: 'default' })

// Genereate the list of functions in a single object
const functions = Object.entries(source).reduce((acc, [path, fn]) => {
  if (typeof fn !== 'function') return acc
  const dotNotation = path.replace(/^\.\//, '').replace(/\.js$/g, '')
  setValue(acc, dotNotation, fn)
  return acc
}, {})

export const makeRoutes = (instance) => {
  const handler = {
    get (obj, prop) {
      // If the API part is an object, then proxify the access to the function
      if (typeof obj[prop] === 'object') return new Proxy(obj[prop], handler)
      // If the API method does not exist return error
      if (typeof obj[prop] !== 'function' || !obj[prop]) {
        return () => {
          return { status: 'fail', data: { errors: [{ message: 'Error! This function does not exist' }] }}
        }
      }
      // Return functions with the arguments
      return function (...args) {
        try {
          const result = obj[prop].apply(instance, args)
          return result
        } catch (err) {
          return { status: 'fail', data: { errors: [{ message: err }] }}
        }
      }
    }
  }
  return new Proxy(functions, handler)  
}
