const mongoose = require("mongoose");
const connectionString = "mongodb+srv://laxmidhar:5CSLOMiSB5ugzLXw@cluster0.a2zvyvc.mongodb.net/SampleDatabase?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
  module.exports = mongoose;