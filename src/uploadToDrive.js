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

//insert product
app.post('/upload', fileUpload.single('image'), async(req, res) => {
    try {
      //const fileId = await fileUploadToDrive(req, res)
      //req.body.image = 'fileId'

      //https://stackoverflow.com/questions/10485302/node-mongoose-getting-to-request-context-in-mongoose-middleware
      req.body.image = req.file.originalname // dummy name to initiate the .save, because image is required. This will be updated in presave in mongoose middleware
      const product = new Product(req.body)
      const result = await product.save(req)
      res.status(201).send(result)
    } catch(error) {
      res.status(400).send(error)
    }
  
})

//get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch(error) {
    res.status(400).send(error)
  } 
})

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if(!product) {
      throw new Error('No Product Found!')
    }
    res.send(product)
  } catch(error) {
    res.status(400).send({error:error.message})
  }
})


//Start node server
app.listen(port, () => {
  console.log('Server has started on port ' + port)
})