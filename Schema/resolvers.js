const Trip = require('../models/modelTrip')
const access_token = 'pk.eyJ1IjoiZHJld3MxMzIiLCJhIjoiY2tvbXh1ejN5MGhxdzMxbDYycXR6Z3BreCJ9.ksNqvNtElrJCgAyki1-CsA'
const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const axios = require('axios')

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
    createTripTest: async (parent, { input }) => {
      const { fromPlaceName, toPlaceName } = input
      console.log(fromPlaceName, toPlaceName)
      const mapBox = await mapBoxFetchInfo(fromPlaceName, toPlaceName)
      const trip = new Trip({ fromName: { id: mapBox.from, name: fromPlaceName }, toName: { id: mapBox.to, name: toPlaceName } })
      await trip.save()
      console.log(trip, 'mongo')
      return trip
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
