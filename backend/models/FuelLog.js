const mongoose = require('mongoose');

const fuelLogSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Vehicle is required'],
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
  },
  liters: {
    type: Number,
    required: [true, 'Liters is required'],
    min: [0, 'Liters cannot be negative'],
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    min: [0, 'Cost cannot be negative'],
  },
  fuelStation: {
    type: String,
    trim: true,
  },
  odometerReading: {
    type: Number,
    min: [0, 'Odometer reading cannot be negative'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('FuelLog', fuelLogSchema);
