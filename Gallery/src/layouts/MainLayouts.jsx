import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          marginBottom: "2rem",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
