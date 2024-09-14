/*
* Upload the file to the server
*/

import { getFileCategory } from './services/getFileCategory'
import { readFileToURL } from './services/readFileToURL'

const replace = async function ({ files, path }) {
  let uploadResult = []
  if (!files.length) return uploadResult

  // Prepare the data for upload
  let formData = new FormData()

  for (let i = 0; i < files.length; i++) {
    formData.append('files[' + i + ']', files[i])
  }

  // Online processing of the files
  try {
    if (navigator.onLine) {
      const { data } = await this.$axios.post(`/files/replace/${path}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (data.status === 'success') uploadResult = data.data
    }
  } catch (err) {
    alert('Can\'t replace these files')
  }

  // Offline processing of the file
  if (!navigator.onLine) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileData = {
        name: file.name,
        path: path + '/' + file.name,
        base64: await readFileToURL(file),
        description: file.name.replace(/\.[A-Za-z]{1,4}$/g, '').replace(/^[a-z]/, s => s.toUpperCase()),
        size: file.size,
        mimetype: file.type,
        createdAt: new Date(),
        category: getCategory({ name: file.name, mimetype: file.type })
      }
      await this.$db.files.add(fileData).catch(err => { return err })      
      delete data.base64
      uploadResult.push(data)
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      let file = uploadResult.find(el => files[i].name.indexOf(el.name) !== -1)
      if (!file) continue
      file.base64 = await readFileToURL(files[i])
      await this.$db.files.add(file).catch(err => { return err })      
    }
  }
  return { status: 'success', data: uploadResult }
}

export default replace
