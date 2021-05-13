const Trip = require('../models/modelTrip')
const access_token = 'pk.eyJ1IjoiZHJld3MxMzIiLCJhIjoiY2tvbXh1ejN5MGhxdzMxbDYycXR6Z3BreCJ9.ksNqvNtElrJCgAyki1-CsA'
const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const axios = require('axios')
const ResponseTrip = (trip) => {
  return {
    id: `urn::trip:${trip._id}`,
    fromPlace: { id: `urn::mapbox:${trip.fromPlace.id}`, name: trip.fromPlace.name },
    toPlace: { id: `urn::mapbox:${trip.toPlace.id}`, name: trip.toPlace.name },
  }
}

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
      console.log(fromPlaceName, toPlaceName)
      const mapBox = await mapBoxFetchInfo(fromPlaceName, toPlaceName)
      const trip = new Trip({ fromPlace: { id: mapBox.from, name: fromPlaceName }, toPlace: { id: mapBox.to, name: toPlaceName } })
      await trip.save()
      console.log(ResponseTrip(trip))

      return ResponseTrip(trip)
    },
  },
}
const mapBoxFetchInfo = async (fromPlaceName, toPlaceName) => {
  fromPlace = await axios
    .get(`${mapBoxUrl}${fromPlaceName}.json?access_token=${access_token}`)
    .then((resp) => resp)
    .catch((e) => {
      console.log(e)
    })
  toPlace = await axios
    .get(`${mapBoxUrl}${toPlaceName}.json?access_token=${access_token}`)
    .then((resp) => resp)
    .catch((e) => {
      console.log(e)
    })

  return { from: fromPlace.data.features[0].id, to: toPlace.data.features[0].id }
}
module.exports = { resolvers }
