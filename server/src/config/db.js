import mongoose from 'mongoose';

// Opens a MongoDB connection using env config.
export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Ricardo-Burgos-summary-db';

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};