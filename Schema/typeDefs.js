const { gql } = require('apollo-server-express')
const typeDefs = gql`
  input CreateTripInput {
    fromPlaceName: String! # from place name e.g. Kyiv | https://docs.mapbox.com/
    toPlaceName: String! # to place name e.g. Berlin | https://docs.mapbox.com/
  }
  input CreateTripInputTest {
    fromPlaceName: String! # from place name e.g. Kyiv | https://docs.mapbox.com/
    toPlaceName: String! # to place name e.g. Berlin | https://docs.mapbox.com/
  }
  type Query {
    books: [Book]
    trips(offset: Int, limit: Int): [Trip!]!
  }
  type Book {
    title: String
    author: String
  }

  type Mutation {
    createTrip(input: CreateTripInput!): Trip
    createTripTest(input: CreateTripInputTest!): TripTest
  }

  type TripTest {
    id: ID! # format "urn::trip:<mongo object id>"
  }
  type Trip {
    id: ID! # format "urn::trip:<mongo object id>"
    fromPlace: Location!
    toPlace: Location!
  }

  type Location {
    id: String # format "urn::mapbox:<mapbox id>" | Get from API by name (feature.id) first result features[0]
    name: String! # Get from API by id (text or place_name)
  }
`
module.exports = { typeDefs }
