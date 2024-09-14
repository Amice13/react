/*
* Query the data
*/

const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
} 

import { checkCollection, prepareFilter, prepareSort } from './utils'

const query = async function (table, request) {
  let { offset, limit, fields, filters, sort, sortOrder, populate } = request
  const result = await this.$axios.post(`/${table}/search`, request).catch(error => {
    return error.response.data
  })
  return result.data
}

export default query
