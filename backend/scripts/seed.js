require('dotenv').config();
const connectDB = require('../src/config/db');

(async () => {
  await connectDB();
  console.log('Seed script placeholder - add demo data here.');
  process.exit(0);
})();
