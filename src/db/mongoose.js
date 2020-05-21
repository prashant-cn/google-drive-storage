const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_PATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true
})