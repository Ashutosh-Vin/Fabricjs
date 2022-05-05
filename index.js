const express = require('express')
const router = express.Router()
const path = require('path')
const hbs = require('hbs')
require('fabric')
require('canvas')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'./src')
const viewsPath = path.join(__dirname,'./views')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))

app.get('', ( req, res) => {
    res.render('index', {
        title: 'Fabric',
        name: 'Vineet'
    })
})

// router.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname+'/indexs.html'))
// })
app.use('/',router)
app.listen(port)