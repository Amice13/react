const register = async function (user) {
  let result = await this.$axios.post('/auth/register', user).catch(error => error.response)
  return result.data
}

export default register
