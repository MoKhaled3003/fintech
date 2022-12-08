const mongoose = require('mongoose');

export async function mongodb() {
  try {
    await mongoose.connect('mongodb://localhost:27017/fintech');
  } catch (error) {

  }
}
