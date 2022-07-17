const mongoose = require('mongoose');

const dbConnect = (URL) => {
  return mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('DB connection succesful');
    })
    .catch(err => {
      console.error('Failed to connect DB');
    });
};

module.exports = dbConnect;