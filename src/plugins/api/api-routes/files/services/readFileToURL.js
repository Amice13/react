export const readFileToURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = (err) => {
      resolve(reader.result)
    }
    if (file) reader.readAsDataURL(file)
  })
}
