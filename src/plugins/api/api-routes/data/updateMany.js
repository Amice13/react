/*
* Atomically modifies and returns a single document
*/

const updateMany = async function (table, request, updateObject) {
  // Check if the collection exists
  try {
    // Find all the objects
    const findObjects = await this.$api.data.find(table, request)
    if (findObjects.status !== 'success') return { status: 'fail', data: { errors: [{ message: 'Unexpected error' }] }}
    for (let item of findObjects.data) {
      await this.$db[collectionName].update(item._id, updateObject)
    }
    return { status: 'success', data }
  } catch (err) {
    console.log(err)
    return { status: 'fail', data: { errors: [{ message: 'Unexpected error' }] }}
  }
}

export default updateMany
