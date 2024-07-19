import mongoose from "mongoose";

const dbName = process.env.DB_NAME;
const userName = process.env.USER_NAME;
const userPassword = process.env.USER_PASSWORD;
const dbHost = process.env.DB_HOST;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${userPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database is connected successfully.");
  } catch (error) {
    console.log("Database is not connected.");
    console.log(error.message);
  }
};

export default connectDB;
