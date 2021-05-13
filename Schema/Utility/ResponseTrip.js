const ResponseTrip = (trip) => {
  return {
    id: `urn::trip:${trip._id}`,
    fromPlace: { id: `urn::mapbox:${trip.fromPlace.id}`, name: trip.fromPlace.name },
    toPlace: { id: `urn::mapbox:${trip.toPlace.id}`, name: trip.toPlace.name },
  }
}

module.exports = ResponseTrip
