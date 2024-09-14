import validators from '@validators'

const getRecords = async function (body) {
  // Validate the password
  const validation = validators.adminRecords.validate(body)
  if (validation.error) {
    return {
      status: 'fail',
      data: { errors: validation.error.details }
    }
  }
  let result = await this.$axios.post('/admin/records', body).catch(error => error.response)
  return result.data
}

export default getRecords
