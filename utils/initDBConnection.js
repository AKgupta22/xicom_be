import mongoose from "mongoose";

const initDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(process.env.DB_URL);
    console.log(error, "error while connecting with database");
  }
};

export default initDBConnection;
