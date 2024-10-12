const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  post: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true,   
  },
  contactNumber: {
    type: String,   
    required: true,
  },
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
