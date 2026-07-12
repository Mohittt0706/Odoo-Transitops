const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');
const connectDB = require('./config/db');

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`FleetPilot Backend running on port ${PORT} [${NODE_ENV}]`);
  });
};

start();
