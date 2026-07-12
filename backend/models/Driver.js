const mongoose = require('mongoose');
const { DRIVER_STATUS_ARRAY } = require('../constants/driverStatus');

const driverSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    licenseCategory: {
      type: String,
      required: [true, 'License category is required'],
      trim: true,
    },
    licenseExpiry: {
      type: Date,
      required: [true, 'License expiry date is required'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    safetyScore: {
      type: Number,
      default: 100,
      min: [0, 'Safety score cannot be below 0'],
      max: [100, 'Safety score cannot exceed 100'],
    },
    status: {
      type: String,
      required: [true, 'Driver status is required'],
      enum: {
        values: require('../constants/driverStatus').DRIVER_STATUS_ARRAY,
        message: 'Invalid driver status: {VALUE}',
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

module.exports = mongoose.model('Driver', driverSchema);
