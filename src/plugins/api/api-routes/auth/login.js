import validators from '@validators'

const login = async function (body) {
  // Validate the password
  const validation = validators.login.validate(body)
  if (validation.error) {
    return {
      status: 'fail',
      data: { errors: validation.error.details }
    }
  }
  let result = await this.$axios.post('/auth/login', body, { withCredentials: true }).catch(error => error.response)
  return result.data
}

export default login
