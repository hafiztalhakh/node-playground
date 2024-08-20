const mongoose = require('mongoose');

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const db = process.env.MONGODB_DATABASE;
const app = process.env.MONGODB_APP;

const MONGO_URI = `mongodb+srv://${user}:${password}@mycluster.3qmr8.mongodb.net/${db}?retryWrites=true&w=majority&appName=${app}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('\u001b[' + 34 + 'm' + `Connected to Database` + '\u001b[0m');
  } catch (error) {
    console.error(error.message);
    // exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
