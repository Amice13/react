const msalVerify = async function (body) {
  let result = await this.$axios.post('/auth/msal-verify', body).catch(error => error.response)
  return result.data
}

export default msalVerify
