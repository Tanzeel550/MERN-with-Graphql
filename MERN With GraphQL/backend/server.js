const mongoose = require('mongoose')
const app = require('./app')

mongoose
    .connect(process.env.MONGODB_LOCAL_URL, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => console.log('App has connected to the database'))
    .catch(e => console.error(e))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log('Server is running on port: ', PORT))
