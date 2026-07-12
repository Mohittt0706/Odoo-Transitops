const mongoose = require('mongoose');
const { MAINTENANCE_STATUS_ARRAY } = require('../constants/maintenanceStatus');

const maintenanceSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle is required'],
      index: true,
    },
    issue: {
      type: String,
      required: [true, 'Issue description is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: [0, 'Cost cannot be negative'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: MAINTENANCE_STATUS_ARRAY,
        message: 'Invalid maintenance status: {VALUE}',
      },
      default: 'OPEN',
    },
    maintenanceDate: {
      type: Date,
      required: [true, 'Maintenance date is required'],
    },
    completedDate: {
      type: Date,
    },
    technicianName: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Maintenance', maintenanceSchema);
