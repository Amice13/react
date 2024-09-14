/*
* Modifies a single document in a collection
*/


const updateOne = async function (collection, request, updateObject) {
  // Check if the collection exists
  try {
    // Find all the objects
    const item = await this.$api.data.findOne(collectionName, request)
    if (item.status !== 'success') return { status: 'fail', data: { errors: [{ message: 'Unexpected error' }] }}
    if (!item.data) return { status: 'fail', data: { errors: [{ message: 'This object is not found' }] }}
    let result = await this.$db[collectionName].update(item.data._id, updateObject)
    return { status: 'success' }
  } catch (err) {
    console.log(err)
    return { status: 'fail', data: { errors: [{ message: 'Unexpected error' }] }}
  }
}

export default updateOne
