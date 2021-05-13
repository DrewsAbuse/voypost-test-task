const { Schema, model } = require('mongoose')

const Trip = new Schema({
  fromPlace: {}, // unique: true
  toPlace: {}, // unique: true
})

module.exports = model('Trip', Trip)
