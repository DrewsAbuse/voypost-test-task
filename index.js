const express = require('express')
const mongoose = require('mongoose')
const { secret } = require('./secretLinks')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./Schema/typeDefs')
const { resolvers } = require('./Schema/resolvers')
const port = 3001
// Initialize the app
const app = express()

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })
// Start the server

const ServerStart = async () => {
  try {
    await mongoose.connect(secret, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(port, () => console.log(`Example app listening on port!${port}  Pid - ${process.pid}`))
  } catch (e) {
    console.log(e)
  }
}

ServerStart()
