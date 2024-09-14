const googleVerify = async function (body) {
  try {
    const result = await this.$axios.post('/auth/google-verify', body)
    return result.data
  } catch (err) {
    console.log(err)
    return err.response.data
  }
}

export default googleVerify
