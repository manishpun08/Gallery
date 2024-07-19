import express from "express";
import connectDB from "./connectDb.js";
import galleryRouter from "./Gallery/gallery.routes.js";
import cors from "cors";

const app = express();

// to make app understand json
app.use(express.json());

// cors
app.use(cors());

// connect db
connectDB();

//register routes
app.use(galleryRouter);

// port and server
const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
