import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const AddImage = () => {
  const navigate = useNavigate();

  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["add-image"],
    mutationFn: async (values) => {
      return await $axios.post("/gallery/add", values);
    },
    // success vayepaxi
    onSuccess: (response) => {
      navigate("/home");
      console.log(response?.data?.message);
    },

    // error aayepaxi
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          description: "",
          image: null,
        }}
        validationSchema={Yup.object({
          description: Yup.string()
            .required("Description is required.")
            .min(10, "Description is at least of 10 character.")
            .max(200, "Description is at most of 200 character.")
            .trim(),

          image: Yup.string().trim().nullable(),
        })}
        onSubmit={async (values) => {
          let imageUrl;

          const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
          const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

          const data = new FormData();

          data.append("file", productImage);
          data.append("upload_preset", upload_preset);
          data.append("cloud_name", cloudname);

          if (productImage) {
            try {
              setImageLoading(true);
              const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudname}/upload`,
                data
              );
              setImageLoading(false);
              imageUrl = res?.data?.secure_url;
            } catch (error) {
              setImageLoading(false);
              console.log("image upload failed...");
            }
          }
          values.image = imageUrl;

          mutate(values);
          console.log(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              width: "450px",
              borderRadius: "10px",
            }}
          >
            {productImage && (
              <Stack sx={{ height: "300px" }}>
                <img
                  src={localUrl}
                  style={{ height: "100%", objectFit: "contain" }}
                />
              </Stack>
            )}
            <FormControl>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    const file = event?.target?.files[0];
                    setProductImage(file);
                    setLocalUrl(URL.createObjectURL(file));
                  }}
                />
              </Button>
            </FormControl>

            <FormControl>
              <TextField
                label="Description"
                multiline
                rows={7}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isLoading || imageLoading}
            >
              {imageLoading ? "Uploading..." : "Submit"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddImage;
