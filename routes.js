const express = require('express')

const fs = require('fs')

const path = require('path')

const { json } = require('express')

const dataFn = require('./data.js')
const data = require('./data.js')

const routes = express.Router()



module.exports = routes

// users file
const dataPath = path.join(__dirname, 'data.json')


// HOME PAGE
routes.get('/', (req,res) => {

  
  
  const tempHomeData = {

    title: "DevBook",
    userData: dataPath,    
    id: 1,
    name: "Anna",
    birthday: "",
    bio: "",
    img: "/images/user1.jpg"    
  }

  dataFn.displayUsers('data.json',(err, homeData) => {

    res.render('home',homeData)
  })

  

})


// USER PROFILE
routes.get('/user/:id', (req,res)=>{

  const id = Number(req.params.id)
    // currentUser = dataPath.users.find( user => user.id === id)

  dataFn.getUserById('data.json', id, (err, userPageData) => {

    res.render('user', userPageData )
  }) 


})

// EDIT PROFILE
routes.get('/user/:id/edit', (req,res) => {

  const regData = {
    title:"edit  profile",
    userData: dataPath,
    id: 1,
    name: "Anna",
    birthday: "",
    bio: "",
    img: "/images/user1.jpg" 
  }

  
  res.render('edit', regData )
})


// POST ROUTE
routes.post('/user/:id/edit', (req,res) => {
  const id = Number(req.params.id)
  const { name, birthday, bio } = req.body

  data.editUser(id, { name, birthday, bio }, (err) => {
    if (err) return res.status(500).send('could not edit')
    res.redirect(`/user/${id}`)
  })
})


