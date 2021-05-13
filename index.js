const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./Schema/typeDefs')
const { resolvers } = require('./Schema/resolvers')

// Initialize the app
const app = express()

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })
// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
