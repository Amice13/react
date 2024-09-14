/*
* Get a single document by id
*/

const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
}

const getTags = async function ({ search, table }) {
  const result = await this.$axios.post('/tags', { search, table }).catch(error => {
    return error.response.data
  })
  return result.data
}

export default getTags
