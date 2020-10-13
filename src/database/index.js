const mongoose = require("mongoose");

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const db = process.env.MONGO_DB_NAME;

mongoose.connect(
  `mongodb+srv://${user}:${password}@mongoapi.3igxg.mongodb.net/${db}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose;
