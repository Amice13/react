/*
* Deletes multiple documents in a collection
*/
const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
} 

import validators from '@validators'

const deleteById = async function (table, id) {
  // Validate the object
  if (!Object.keys(validators).includes(table)) {
    return { status: 'fail', data: { errors: [{ message: 'This collection does not exist' }] }}
  }
  const result = await this.$axios.delete(`/${table}/${id}`).catch(error => {
    return error.response.data
  })
  return { status: 'success' }
}

export default deleteById
