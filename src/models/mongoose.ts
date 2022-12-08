const mongoose = require('mongoose');

export async function mongodb() {
  try {
    await mongoose.connect(process.env.MONGOURI);
  } catch (error) {

  }
}
