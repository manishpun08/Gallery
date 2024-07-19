import express from "express";
import { Gallery } from "./gallery.model.js";
import { addPhotoToGallery } from "./gallery.validation.js";
import { addPhotoMiddleware } from "./gallery.middleware.js";

const router = express.Router();

// add image
router.post(
  "/gallery/add",
  // validating data
  addPhotoMiddleware,

  async (req, res) => {
    // extract data from req.body
    const newValues = req.body;

    // create image document
    await Gallery.create(newValues);

    return res.status(201).send({ message: "Image is uploaded successfully." });
  }
);

//get images
router.get("/gallery/get", async (req, res) => {
  const getImages = await Gallery.find();

  return res
    .status(201)
    .send({ message: "Image is displayed successfully..", getImages });
});

// delete images
router.delete("/delete", async (req, res) => {
  await Gallery.deleteMany();
  return res.status(201).send({ message: "deleted....." });
});

export default router;
