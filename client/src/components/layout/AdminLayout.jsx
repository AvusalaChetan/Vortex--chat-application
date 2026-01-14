import {
  Grid,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {useState} from "react";
import {useLocation, Link as LinkRouterDom, Navigate} from "react-router-dom";

const Link = styled(LinkRouterDom)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const admintTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const isAdmin = true;

const AdminLayout = ({children}) => {
  const [isMobile, setIsMobile] = useState(false);

  const handileMoblie = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {xs: "block", md: "none"},
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handileMoblie}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {xs: "none", md: "block"},
          width: "25%",
        }}
      >
        <SideBar />
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          width: {xs: "100%", md: "70%"},
          p: 2,
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w="50vw" />
      </Drawer>
    </Grid>
  );
};

const SideBar = ({w = "100%"}) => {
  const location = useLocation();
  const logOutHandiler = () => {};
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform="uppercase">
        vortex
      </Typography>
      <Stack spacing={"1rem"}>
        {admintTabs.map((tab) => {
          return (
            <Link
              key={tab.path}
              to={tab.path}
              sx={
                location.pathname === tab.path && {
                  bgcolor: "rgb(0, 0, 0)",
                  color: "white",
                  ":hover": {color: "gray"},
                }
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography>{tab.name} </Typography>
              </Stack>
            </Link>
          );
        })}
        <Link onClick={logOutHandiler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
