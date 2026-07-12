const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config/env');
const User = require('../models/User');

const users = [
  {
    fullName: 'Operation Lead',
    email: 'admin@fleetpilot.com',
    password: 'Admin@123',
    role: 'OPERATION_LEAD',
  },
  {
    fullName: 'Road Captain',
    email: 'driver@fleetpilot.com',
    password: 'Driver@123',
    role: 'ROAD_CAPTAIN',
  },
  {
    fullName: 'Safety Officer',
    email: 'safety@fleetpilot.com',
    password: 'Safety@123',
    role: 'SAFETY_OFFICER',
  },
  {
    fullName: 'Finance Hub',
    email: 'finance@fleetpilot.com',
    password: 'Finance@123',
    role: 'FINANCE_HUB',
  },
  {
    fullName: 'Destination Control',
    email: 'receiver@fleetpilot.com',
    password: 'Receiver@123',
    role: 'DESTINATION_CONTROL',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDB connected');

    for (const userData of users) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        console.log(`User ${userData.email} already exists, skipping`);
        continue;
      }

      const user = await User.create(userData);
      console.log(`Created user: ${user.email} (${user.role})`);
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
