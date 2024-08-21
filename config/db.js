const mongoose = require('mongoose');

const URI = `${process.env.MONGO_URI}?retryWrites=true&w=majority&appName=${process.env.MONGO_APP}`;

async function connectDB() {
  try {
    await mongoose.connect(URI, {});
    console.log(
      '\u001b[' + 34 + 'm' + `Connected to the Database` + '\u001b[0m'
    );
    console.log('------------------------------');
  } catch (error) {
    console.error(error.message);
    // exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;
