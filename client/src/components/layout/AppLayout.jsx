import {Grid} from "@mui/material";
import Header from "./Header";
import Title from "../Shared/Title";

const AppLayout = (WrappedComponent) => {
  return (props) => (
    <>
      <Title />
      <Header />
      <Grid
        container
        sx={{
          height: "calc(100vh - 4rem)",
          width: "100%", // avoid 100vw overflow
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid red",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          sx={{
            height: "100%",
            bgcolor: "primary.light",
            p: 2,
            width: {lg: "33%", md: "45%"},
            border: "1px solid red",
            display: {xs: "none", sm: "none", md: "block"},
          }}
        >
          first
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          lg={4}
          sx={{
            height: "100%",
            bgcolor: "background.paper",
            p: 2,
            width: {lg: "33%", md: "45%", sm: "90%", xs: "100%"},
            border: "1px solid red",
          }}
        >
          <WrappedComponent {...props} />
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            height: "100%",
            bgcolor: "secondary.light",
            p: 2,
            width: {lg: "30%"},
            border: "1px solid red",

            display: {xs: "none", sm: "none", md: "none", lg: "block"},
          }}
        >
          third
        </Grid>
      </Grid>

      <div>footer</div>
    </>
  );
};

export default AppLayout;
