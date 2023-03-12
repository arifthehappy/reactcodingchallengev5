import React from "react";
//import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import List from "../todoListTable";
import UserDetails from "../userDetail";

const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={8}>
            <List />
          </Grid>
          <Grid item xs={4}>
            <UserDetails />
          </Grid>
        </Grid>
      </Box>
      <Paper elevation={3} />
    </>
  );
};

export default Home;
