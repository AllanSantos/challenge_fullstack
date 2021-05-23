import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  financialBalance: {
    type: Number,
    required: true
  },
  clientSince: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;