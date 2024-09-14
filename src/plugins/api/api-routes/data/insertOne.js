/*
* Inserts a new document in a collection
*/

import validators from '@validators'

const insertOne = async function (table, item) {

  // Validate the object
  if (!Object.keys(validators).includes(table)) {
    return { status: 'fail', data: { errors: [{ message: 'This collection does not exist' }] }}
  }

  let validated = validators[table].tailor('post').validate(item, { abortEarly: false })
  if (validated.error) {
    return { status: 'fail', data: { errors: validated.error.details }}
  }

  // Create mongo _id if the object is new
  item = JSON.parse(JSON.stringify(item))

  try {
    return { status: 'success', data }
  } catch (err) {
    console.log(err)
    return { status: 'fail', data: { errors: [{ message: 'Unexpected error' }] }}
  }

  return 'result'
}

export default insertOne
