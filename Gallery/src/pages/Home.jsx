import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import { Box } from "@mui/material";

const Home = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-image"],
    queryFn: async () => {
      return await $axios.get("/gallery/get");
    },
    onSuccess: (response) => {
      console.log(response?.data?.message);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  const getImages = data?.data?.getImages; // Safely access getImages

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ImageList sx={{ width: "100%" }} variant="masonry" cols={4} gap={8}>
        {getImages.map((item, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image}?w=248&fit=crop&auto=format`}
              alt={item.description}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Home;
