import AdminLayout from "../../components/layout/AdminLayout";
import {Box, Container, Paper, Stack, Typography} from "@mui/material";
import {
  AdminPanelSettings,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {CurveButton, SearchField} from "../../components/StyledComponent";
import {LineChart, DoughnutChart} from "../../components/specfic/Chart";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{padding: "2rem", margin: "2rem 0", borderRadius: "1rem"}}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <AdminPanelSettings sx={{fontSize: "2rem"}} />
        <SearchField placeholder="search here " />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          variant="h6"
          display={{xs: "none", md: "block"}}
          fontSize={{md: "1rem"}}
          color="rgba(0,0,0,0.7)"
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const wedgets = (
    <Stack
      direction={{xs: "column", sm: "row"}}
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={"2rem"}
      // mb={"2rem 0"}
      sx={{mt: "2rem"}}
    >
      <Widget title={"Users"} value={35} icon={<PersonIcon />} />
      <Widget title={"Chats"} value={5} icon={<GroupIcon />} />
      <Widget title={"Messages"} value={335} icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={{xs: "column", lg: "row"}}
          spacing={2}
          sx={{mt: "2rem"}}
        >
          {/* Last Messages Section */}
          <Paper
            elevation={3}
            sx={{
              padding: "2rem",
              borderRadius: "1rem",
              width: "100%",
              flex: 1,
            }}
          >
            <Typography variant="h4" mb={"2rem"}>
              Last Messages
            </Typography>
            <LineChart value={[1, 2, 34, 8]} />
          </Paper>

          {/* Chart Section */}
          <Paper
            elevation={3}
            sx={{
              padding: "3rem 2rem",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: {xs: "100%", lg: "40%"},
              maxHeight: "30rem",
              position: "relative",
              bgcolor: "#f5f5f5",//dsa
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={1}
              sx={{mb: 2}}
            >
              <GroupIcon />
              <Typography>vs</Typography>
              <PersonIcon />
            </Stack>
            <Box sx={{width: "100%", maxWidth: "20rem"}}>
              {/* Doughnut Chart will go here */}
              <Typography textAlign="center" color="text.secondary">
                Chart placeholder
              </Typography>
            </Box>
            <DoughnutChart labels={["single chat", "group chats"]} value={[60,40]}/>
          </Paper>
        </Stack>
        {wedgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({icon, title, value}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={2}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: `5px solid rgba(0,0,0,0.9)`,
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>
        <Stack>
          {icon}
          <Typography variant="h6" color="rgba(0,0,0,0.7)">
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Dashboard;
