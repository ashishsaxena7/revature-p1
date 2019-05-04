const http = require('http')
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyparser = require('body-parser')
const multer = require('multer')
const upload = multer({ dest: './upload/'})
// const logger = require('morgan')
const path = require('path')
const fs = require('fs')
let directorypath = path.join(__dirname, '/upload/')
const cosmos = require('@azure/cosmos').CosmosClient
const app = express();
let port = 8080;

// let multer = require('express-multer')
//app.use('/form', express.static(__dirname + '/index.html'));
app.use(express.static('.'))
app.use(fileUpload());

const nosql = new cosmos({ endpoint:'https://projecttrial.documents.azure.com:443/', auth: {
  masterKey: 'YnnKMEtSeq4l9SmYJAQ14bUbQTDjznYp0AQj6iky5bc4Ghk0xHUWrJPH9TQkioZNaBAquLYBAXzh2TPaZeuYsg=='
}})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
 })

app.get('/images', (req,res) =>{
   console.log(directorypath)
   fs.readdir(directorypath, (err,files) =>{
     if (err) {
       return res.json('error')
     }
     return res.json(files)
   })
})


app.listen(port, function(){
  console.log('server is up');
});


app.post('/upload', upload.single('sampleFile'), (req,res)=>{
  res.redirect('/')
 
  if (req.files.length == 0) {
    return res.status(400).send('No files were uploaded.');
   }
  let filename = req.files.sampleFile.name
  let File = req.files.sampleFile;
//  File.mv(directorypath + filename)
  File.mv(directorypath + filename, function(err) {
    if (err)
      return res.status(500).send(err);

//     res.send('Upload success').redirect('/');
   });
//  res.render('index.html', { filename: `Name Of File: ${filename}` })
 });
