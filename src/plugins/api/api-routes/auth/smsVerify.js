const smsVerify = async function (body) {
  let result = await this.$axios.post('/auth/sms-verify', body).catch(error => error.response)
  return result.data
}

export default smsVerify
