const axios = require('axios')
const { mapBoxToken } = require('../../secretLinks')
const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapBoxFetch = async (fromPlaceName, toPlaceName) => {
  fromPlace = await axios
    .get(`${mapBoxUrl}${fromPlaceName}.json?access_token=${mapBoxToken}`)
    .then((resp) => resp)
    .catch((e) => {
      console.log(e)
    })
  toPlace = await axios
    .get(`${mapBoxUrl}${toPlaceName}.json?access_token=${mapBoxToken}`)
    .then((resp) => resp)
    .catch((e) => {
      console.log(e)
    })

  return { from: fromPlace.data.features[0].id, to: toPlace.data.features[0].id }
}
module.exports = mapBoxFetch
