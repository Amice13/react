const getIndices = async function (code) {
  let result = await this.$axios.get('/admin/indices').catch(error => error.response)
  return result.data
}

export default getIndices
