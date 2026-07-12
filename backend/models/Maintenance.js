const mongoose = require('mongoose');

const MAINTENANCE_STATUS = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
};

const MAINTENANCE_STATUS_ARRAY = Object.values(MAINTENANCE_STATUS);

const maintenanceSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Vehicle is required'],
  },
  issue: {
    type: String,
    required: [true, 'Issue is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    min: [0, 'Cost cannot be negative'],
  },
  status: {
    type: String,
    required: [true, 'Maintenance status is required'],
    enum: {
      values: ['OPEN', 'IN_PROGRESS', 'COMPLETED'],
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
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);
