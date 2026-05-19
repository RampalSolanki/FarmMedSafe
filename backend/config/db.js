import mongoose from 'mongoose';

const connectDB = async () => {
  const maxRetries = 3;
  let retryCount = 0;

  const connect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      retryCount++;
      
      if (error.message.includes('IP')) {
        console.error(`\n❌ IP Whitelist Error: Your IP is not whitelisted in MongoDB Atlas`);
        console.error(`   1. Go to: https://cloud.mongodb.com/`);
        console.error(`   2. Click your cluster → Security → Network Access`);
        console.error(`   3. Add your current IP or use 0.0.0.0/0 for development`);
        console.error(`   📍 Find your IP: https://www.whatismyip.com/\n`);
        process.exit(1);
      }
      
      if (retryCount < maxRetries) {
        console.warn(`⚠️  Connection attempt ${retryCount}/${maxRetries} failed. Retrying in 2 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return connect();
      }
      
      console.error(`❌ Error: ${error.message}`);
      process.exit(1);
    }
  };

  return connect();
};

export default connectDB;