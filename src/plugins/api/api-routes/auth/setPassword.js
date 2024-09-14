import validators from '@validators'

const setPassword = async function (body) {
  const validation = validators.setPassword.validate(body)
  if (validation.error) {
    return {
      status: 'fail',
      data: { errors: validation.error.details }
    }
  }
  let result = await this.$axios.post('/auth/set-password', body).catch(error => error.response)
  return result.data
}

export default setPassword
