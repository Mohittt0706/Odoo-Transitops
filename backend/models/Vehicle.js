const mongoose = require('mongoose');
const { VEHICLE_STATUS_ARRAY } = require('../constants/vehicleStatus');

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    vehicleName: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      trim: true,
    },
    maxLoadCapacity: {
      type: Number,
      required: [true, 'Max load capacity is required'],
      min: [0, 'Max load capacity cannot be negative'],
    },
    odometer: {
      type: Number,
      default: 0,
      min: [0, 'Odometer cannot be negative'],
    },
    acquisitionCost: {
      type: Number,
      required: [true, 'Acquisition cost is required'],
      min: [0, 'Acquisition cost cannot be negative'],
    },
    status: {
      type: String,
      required: [true, 'Vehicle status is required'],
      enum: {
        values: require('../constants/vehicleStatus').VEHICLE_STATUS_ARRAY,
        message: 'Invalid vehicle status: {VALUE}',
      },
      default: 'AVAILABLE',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
