const { Schema, model } = require('mongoose')

const Trip = new Schema({
  fromPlace: { type: Object, required: true },
  toPlace: { type: Object, required: true },
})

module.exports = model('Trip', Trip)
