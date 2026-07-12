const mongoose = require('mongoose');

const vehicleDocumentSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Vehicle is required'],
  },
  documentName: {
    type: String,
    required: [true, 'Document name is required'],
    trim: true,
  },
  documentUrl: {
    type: String,
    required: [true, 'Document URL is required'],
    trim: true,
  },
  expiryDate: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('VehicleDocument', vehicleDocumentSchema);
