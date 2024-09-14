/*
* Modifies a single document in a collection
*/

import validators from '@validators'

const updateById = async function (table, _id, updateObject) {
  // Validate the object
  updateObject._id = _id
  if (!Object.keys(validators).includes(table)) {
    return { status: 'fail', data: { errors: [{ message: 'This collection does not exist' }] }}
  }
  let validated = validators[table].tailor('put').validate(updateObject, { abortEarly: false })
  if (validated.error) {
    return { status: 'fail', data: { errors: validated.error.details }}
  }
  // Check if the collection exists
  try {
    // Find all the objects
    let item = JSON.parse(JSON.stringify(updateObject))
    return { status: 'success' }
  } catch (err) {
    console.log(err)
    return { status: 'fail', data: { errors: [{ message: 'Unexpected error' }] }}
  }
}

export default updateById