import mongoose from "mongoose";

// create schema
const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
});

// create table
export const Gallery = mongoose.model("Gallery", gallerySchema);
