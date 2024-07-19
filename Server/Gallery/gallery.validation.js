import Yup from "yup";

export let addPhotoToGallery = Yup.object({
  image: Yup.string().required("Image is required.").trim(),
  description: Yup.string()
    .required("Description is required.")
    .min(10, "Description is at least of 10 character.")
    .max(200, "Description is at most of 200.")
    .trim(),
});
