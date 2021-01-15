const fs = require('fs')

module.exports = {
  getUserById,
  newUser,
  editUser,
}

function getUserById(file, id, cb) {
  loadJson(file, (err, data) => {
    const foundUser = data.users.find( element => element.id === id)
    if (foundUser === undefined) return cb(new Error('this is messed up'))
    cb(null, foundUser)
  })
}

function newUser(file, details, cb) {
  
}

function editUser(id, details, cb) {
  
}

// Internal Utilities

function loadJson(file, cb) {
  fs.readFile(file, 'UTF-8', (err, data) => {
    if (err) return cb(new Error(err.message))
    cb(null, JSON.parse(data))
  })
}

function saveJson(file, data, cb) {
  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) return cb(new Error(err.message))
    cb()
  })
} 