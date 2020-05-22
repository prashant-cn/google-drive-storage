require('./db/mongoose') // to connect to database
const multer = require('multer');
const express = require('express')
const { Product } = require('./db/productsDBModel')
const { fileUploadToDrive } = require('./auth/authFuntions')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json()) //for incoming json requests



const fileUpload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
})

app.post('/upload', fileUpload.single('image'), async(req, res) => {

  const fileId = await fileUploadToDrive(req, res)
  console.log(fileId, "from fileUploadToDrive")
  req.body.image = fileId

  const product = new Product(req.body)
  console.log(req.body , "BODY")
  product.save()
  res.status(201).send(req.body)
})



//Start node server
app.listen(port, () => {
  console.log('Server has started on port ' + port)
})