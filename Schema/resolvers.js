const Trip = require('../models/modelTrip')

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createTripTest: async (parent, args) => {
      const { fromPlaceName, toPlaceName } = args
      console.log(await mapBoxFetchInfo())
      const trip = new Trip({ fromPlaceName, toPlaceName })
      console.log(trip, 'mongo')
      return trip
    },
  },
}

module.exports = { resolvers }
