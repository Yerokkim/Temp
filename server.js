const express= require('express');
const fetch = require('isomorphic-fetch')
const app=express()
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(express.static('public'))


app.get('/',function(req,res){

    res.sendFile(__dirname+'/public/index.html')

    })


  
app.listen(port, () => {
    console.log(`server with ${port}`)
  })