import {Container, Paper, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const Table = ({row, columns, heading, rowHeight = 52}) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
      }}
    >
      <Paper
        //   elevation={3}
        sx={{
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          flex: 1,
          overflow: "hidden",
          height: "100%",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" color="initial">
          {heading}
        </Typography>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          autoHeight
          rowHeight={rowHeight}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            ".table-header": {
              backgroundColor: "#f5f5f5",
              color: "#000",
              fontWeight: "bold",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
