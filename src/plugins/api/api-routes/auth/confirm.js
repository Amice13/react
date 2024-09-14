const confirmEmail = async function (code) {
  let result = await this.$axios.post('/auth/confirm', { code }).catch(error => error.response)
  return result.data
}

export default confirmEmail
