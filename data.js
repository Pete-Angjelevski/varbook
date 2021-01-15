const fs = require('fs')

module.exports = {
  getUserById,
  newUser,
  editUser,
  displayUsers,
  internals: {
    getNextId,
    loadJson,
    saveJson,
  }
}

function getUserById(file, id, cb) {
  loadJson(file, (err, data) => {
    const foundUser = data.users.find( element => element.id == id)
    if (foundUser === undefined) return cb(new Error('this is messed up'))
    cb(null, foundUser)
  })
}

function newUser(file, details, cb) {
  
}

function editUser(file, id, details, cb) {
  loadJson(file, (err, data) => {
    if (err) cb(err)
    const foundUser = data.users.find( element => element.id === id)
    Object.assign(foundUser, details)

    saveJson(file, data, cb)
  })
}

function displayUsers(file, cb){

    loadJson(file, (err, data) => { 
    cb(null, data)
  })


}


// Internal Utilities

function getNextId(userList) {
  const highestId = userList
    .map(user => user.id)
    .reduce((highest, id) => id > highest ? id : highest)

  return highestId + 1
}

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