const express = require('express')

const fs = require('fs')

const path = require('path')

const { json } = require('express')

const routes = express.Router()

module.exports = routes

// users file
const dataPath = path.join(__dirname, 'data.json')


// HOME PAGE
routes.get('/', (req,res) => {

  const homeData = {

    title: "DevBook",
    userData: dataPath
  }


  fs.readFile(dataPath, 'utf8', (err,data) => {
    if (err){ 
      console.log("whoops")
    }
    else {

    var  obj = JSON.parse(data)
    
    console.log('object', obj)
  }
  })

  res.render('home',homeData)

})

// REGISTER
routes.get('/register', (req,res) => {

  const regData = {
    title:"Create your profile",
    userData: dataPath
  }


  res.render('register', regData )
})

// USERPROFILE

routes.get('/user/:id', (req,res)=>{

  const id= Number(req.params.id)
    // currentUser = dataPath.users.find( user => user.id === id)

  const userPageData = {
    title: "current user",
    userData: dataPath
  }



  
  res.render('user', userPageData  )

})