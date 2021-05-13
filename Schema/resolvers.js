const Trip = require('../models/modelTrip')
const ResponseTrip = require('./Utility/ResponseTrip')
const mapBoxFetch = require('./Utility/mapBoxFetch')
const resolvers = {
  Query: {
    trips: async (parent, { offset, limit }) => {
      const AllTrips = await Trip.find()
      const responseAllTrips = AllTrips.slice(offset, limit).map((element) => {
        return ResponseTrip(element)
      })
      return responseAllTrips
    },
  },
  Mutation: {
    createTrip: async (parent, { input }) => {
      const { fromPlaceName, toPlaceName } = input

      const mapBox = await mapBoxFetch(fromPlaceName, toPlaceName)
      const trip = new Trip({ fromPlace: { id: mapBox.from, name: fromPlaceName }, toPlace: { id: mapBox.to, name: toPlaceName } })
      await trip.save()

      return ResponseTrip(trip)
    },
  },
}

module.exports = { resolvers }
