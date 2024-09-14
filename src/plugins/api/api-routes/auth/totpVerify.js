const totpVerify = async function (body) {
  let result = await this.$axios.post('/auth/totp-verify', body).catch(error => error.response)
  return result.data
}

export default totpVerify
