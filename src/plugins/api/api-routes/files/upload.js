/*
* Upload the file to the server
*/

import { getFileCategory } from './services/getFileCategory'
import { readFileToURL } from './services/readFileToURL'

const isOffline = () => {
  return process.env.IS_TEST || !navigator.onLine
} 

const upload = async function ({ files, path }) {
  let uploadResult = []
  if (!files.length) return uploadResult

  if (isOffline()) {
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
        category: getFileCategory({ name: file.name, mimetype: file.type }),
        synced: 0
      }
      uploadResult.push(fileData)
    }
    await this.$db['files'].bulkPut(uploadResult)
    return { status: 'success', data: uploadResult }
  }


  // Online processing of the files
  try {
    if (!isOffline()) {
      // Prepare the data for upload
      let formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        formData.append('files[' + i + ']', files[i])
      }
      const { data } = await this.$axios.post(`/files/upload/${path}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (data.status === 'success') uploadResult = data.data
    }
  } catch (err) {
    alert('Can\'t upload these files')
  }

  // Offline processing of the file
  if (isOffline()) {
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
        category: getFileCategory({ name: file.name, mimetype: file.type })
      }
      await this.$db.files.put(fileData).catch(err => { return err })      
      delete fileData.base64
      uploadResult.push(fileData)
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      let file = uploadResult.find(el => files[i].name.indexOf(el.name) !== -1)
      if (!file) continue
      try {
        await this.$db.files.put(file).catch(err => { return err })
      } catch (err) {
        console.log(err)
      }
    }
  }
  return { status: 'success', data: uploadResult }
}

export default upload
