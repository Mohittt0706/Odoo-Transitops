const mongoose = require('mongoose');

const EXPENSE_TYPES = ['Fuel', 'Maintenance', 'Toll', 'Parking', 'Insurance', 'Other'];

const expenseSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Vehicle is required'],
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
  },
  type: {
    type: String,
    required: [true, 'Expense type is required'],
    enum: {
      values: EXPENSE_TYPES,
      message: 'Invalid expense type: {VALUE}',
    },
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
