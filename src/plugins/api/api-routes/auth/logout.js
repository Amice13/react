const logout = async function (user) {
  let result = await this.$axios.get('/auth/logout').catch(error => error.response)
  return result.data
}

export default logout
