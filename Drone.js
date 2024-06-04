const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assemblyDate: {
    type: Date,
    required: true,
  },
  parts: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Drone', droneSchema);
const Drone = mongoose.model('Drone', droneSchema);
module.exports = Drone;

