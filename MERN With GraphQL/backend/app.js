const express = require('express')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const fs = require('fs')
const cors = require('cors')
const bookingResolver = require('./graphql/bookingResolver')
const eventResolver = require('./graphql/eventResolver')
const userResolver = require('./graphql/userResolver')
const { authMiddleware } = require('./middlewares/authMiddleware')

require('dotenv').config({ path: path.resolve(__dirname, 'config.env') })

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK'
    })
})

app.use(authMiddleware)

const schema = buildSchema(
    fs.readFileSync(path.resolve(__dirname, 'graphql', 'schema.graphql'), 'utf8')
)
const resolvers = { ...bookingResolver, ...eventResolver, ...userResolver }
app.use('/graphql', graphqlHTTP({ schema, rootValue: resolvers, graphiql: true }))

module.exports = app
