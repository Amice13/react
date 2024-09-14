const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
} 

const me = async function (email) {
  // Get the user if the user offline
  if (isOffline()) {
    if (email) {
      const user = await this.$api.data.findOne('users', { filters: { email: [email] }})
      if (user.status === 'success') return user.data || {} 
      return {}
    }
    return {}
  }
  let result = await this.$axios.get('/users/me').catch(error => error.response)

  // Get the user offline
  if (result.status === 'success') {
    const user = JSON.parse(JSON.stringify(result.data))
    user.synced = 1
    await this.$api.data.upsertOne('users', user)
  }

  return result.data
}

export default me
