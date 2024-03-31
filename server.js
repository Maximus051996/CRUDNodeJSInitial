const express = require('express')
const app = express()

// routes

app.get('/', (req, res) => {
    res.send("Node JS 1st application")
})

app.listen(3000, () => {
    console.log("APP STARTED ...")
})