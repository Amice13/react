/*
* Get a single document by id
*/

const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
}

const search = async function ({ entity, search, field, fields }) {
  const result = await this.$axios.post('/search', { entity, search, field, fields }).catch(error => {
    return error.response.data
  })
  return result.data
}

export default search
