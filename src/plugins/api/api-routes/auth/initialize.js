const initialize = async function (user) {
  let result = await this.$axios.post('/auth/initialize', user).catch(error => error.response)
  return result.data
}

export default initialize
