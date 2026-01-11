import {Skeleton, Grid, Stack} from "@mui/material";

export const LayOutLoader = () => {
  return (
    <Grid
      container
      sx={{
        height: "calc(100vh - 4rem)",
        width: "100%", // avoid 100vw overflow
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        size={{xs: 12, md: 4, lg: 4}}
        sx={{
          height: "100%",
          width: {lg: "33%", md: "45%"},
          p: 2,
          display: {xs: "none", sm: "none", md: "block"},
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>

      <Grid
        size={{xs: 12, md: 8, lg: 4}}
        sx={{
          height: "100%",
          p: 2,
          width: {lg: "33%", md: "45%", sm: "90%", xs: "100%"},
        }}
      >
        <Stack spacing={"1rem"}>
          {Array.from({length: 10}).map((_, idx) => {
            return <Skeleton key={idx} variant="rectangular" height={"5rem"} />;
          })}
        </Stack>
      </Grid>

      <Grid
        size={{xs: 12, lg: 4}}
        sx={{
          height: "100%",
          p: 2,
          width: {lg: "30%"},
          display: {xs: "none", sm: "none", md: "none", lg: "block"},
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};
