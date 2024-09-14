/*
* Get a single document by id
*/

const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
}

const getById = async function (table, _id) {
  try {
    const result = await this.$axios(`/${table}/${_id}`)
    return result.data
  } catch (err) {
    return err.response.data
  }
}

export default getById
