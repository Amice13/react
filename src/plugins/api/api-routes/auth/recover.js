const recover = async function (body) {
  let result = await this.$axios.post('/auth/recover', body).catch(error => error.response)
  return result.data
}

export default recover
