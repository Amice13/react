// Get all scripts in the current folder
const source = import.meta.glob(['./*.js', '!./index.js'], { eager: true, import: 'default' })

// Rename the object keys
let target = {}
for (let key of Object.keys(source)) {
  target[key.replace(/^\.\/|\.js$/g, '')] = source[key]
}

export default target
