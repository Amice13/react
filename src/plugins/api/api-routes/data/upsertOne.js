/*
* Inserts a new document in a collection
*/

const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
} 

import validators from '@validators'

const upsertOne = async function (table, item) {
  // Validate the object
  if (!Object.keys(validators).includes(table)) {
    return { status: 'fail', data: { errors: [{ message: 'This collection does not exist' }] }}
  }

  const method = item.id ? 'put' : 'post'
  const result = await this.$axios[method](`/${table}`, item).catch(error => {
    return error.response.data
  })

  return result.data  
}

export default upsertOne
