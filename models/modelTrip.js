const { Schema, model } = require('mongoose')

const Trip = new Schema({
  fromPlace: { type: Object, required: true }, // unique: true
  toPlace: { type: Object, required: true }, // unique: true
})

module.exports = model('Trip', Trip)
