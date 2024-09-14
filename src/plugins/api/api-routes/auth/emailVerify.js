const emailVerify = async function (body) {
  let result = await this.$axios.post('/auth/email-verify', body).catch(error => error.response)
  return result.data
}

export default emailVerify
