/*
* Inserts several new document in a collection
*/
const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
} 

import validators from '@validators'

const insertMany = async function (table, arrayOfItems) {

  // Validate the object
  if (!Object.keys(validators).includes(table)) {
    return { status: 'fail', data: { errors: [{ message: 'This collection does not exist' }] }}
  }

  const result = await this.$axios.post(`/${table}/bulk`, arrayOfItems).catch(error => {
    return error.response.data
  })
  return result.data  
}

export default insertMany
