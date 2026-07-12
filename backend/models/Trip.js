const mongoose = require('mongoose');
const { TRIP_STATUS_ARRAY } = require('../constants/tripStatus');

const tripSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: [true, 'Source is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    cargoWeight: {
      type: Number,
      required: [true, 'Cargo weight is required'],
      min: [0, 'Cargo weight cannot be negative'],
    },
    plannedDistance: {
      type: Number,
      required: [true, 'Planned distance is required'],
      min: [0, 'Planned distance cannot be negative'],
    },
    actualDistance: {
      type: Number,
      default: 0,
      min: [0, 'Actual distance cannot be negative'],
    },
    status: {
      type: String,
      required: [true, 'Trip status is required'],
      enum: {
        values: require('../constants/tripStatus').TRIP_STATUS_ARRAY,
        message: 'Invalid trip status: {VALUE}',
      },
      default: 'DRAFT',
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle is required'],
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: [true, 'Driver is required'],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receiver',
      required: [true, 'Receiver is required'],
    },
    dispatchTime: {
      type: Date,
    },
    completionTime: {
      type: Date,
    },
    deliveryTime: {
      type: Date,
    },
    receiverRemarks: {
      type: String,
      trim: true,
    },
    receiverSignature: {
      type: String,
      trim: true,
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

module.exports = mongoose.model('Trip', tripSchema);
