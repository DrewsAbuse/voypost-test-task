const { Schema, model } = require('mongoose')

const Trip = new Schema({
  fromName: {}, // unique: true
  toName: {}, // unique: true
})

module.exports = model('Trip', Trip)
