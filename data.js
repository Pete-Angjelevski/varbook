const fs = require('fs')

module.exports = {
  getUserById,
  newUser,
  editUser,
  loadJson,
  saveJson,
}

function getUserById(file, id, cb) {
  loadJson(file, (err, data) => {
    const foundUser = data.users.find( (element) => {
      element.id === id
    })
    if (foundUser === undefined) return cb(new Error(err.message))
    cb(null, foundUser)
  })
}

function newUser(file, details, cb) {
  
}

function editUser(id, details, cb) {
  
}

function loadJson(file, cb) {
  fs.readFile(file, 'UTF-8', (err, data) => {
    if (err) return cb(new Error(err.message))
    cb(null, data)
  })
}

function saveJson(file, cb) {
  
}