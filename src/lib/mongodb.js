import mongoose from 'mongoose';

const connection = {};

async function DB() {
  if (connection.isConnected) {
    console.log('already connected database');
    return;
  }
  try {
    const database = await mongoose.connect(process.env.MONGO_URL || '');
    connection.isConnected = database.connections[0].readyState;
    console.log('database connected successfully');
  } catch (error) {
    console.log('database connection failed', error);
    process.exit(1);
  }
}

export default DB;
