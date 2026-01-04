import {lazy,Suspense, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Backdrop,
} from "@mui/material";
import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcons,
  Search as SearchIcon,
} from "@mui/icons-material";
import {darkOrange} from "../../constants/color";

const SearchBar = lazy(()=>import('../specfic/SearchBar'))
const Notificaiton = lazy(()=>import('../specfic/Notifications'))
const NewGroup= lazy(()=>import('../specfic/NewGroup'))

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => setIsMobile((p) => !p);
  const openSearchBar = () => setIsSearch((p) => !p);
  const openNewGroup = () => setIsNewGroup((p) => !p);
  const toggleNotification = () => setIsNotification((p) => !p);

  const navigateToGroup = () => navigate("/groups");
  const handleLogOut = () => {
    console.log("handleLogOut");
  };

  return (
    <>
      <Box sx={{flexGrow: 1, height: "4rem"}}>
        <AppBar position="static" sx={{bgcolor: darkOrange, height: "100%"}}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{display: {xs: "none", sm: "block"}}}>
              vortex
            </Typography>

            <Box sx={{display: {xs: "block", sm: "none"}}}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box>
              <IconBtn
                title="search"
                icon={<SearchIcon />}
                onClick={openSearchBar}
              />
              <IconBtn
                title="new group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title="manage groups"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title="notification"
                icon={<NotificationsIcons />}
                onClick={toggleNotification}
              />
              <IconBtn
                title="logout"
                icon={<LogoutIcon />}
                onClick={handleLogOut}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchBar />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notificaiton />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({title, icon, onClick}) => (
  <Tooltip title={title}>
    <IconButton color="inherit" size="large" onClick={onClick}>
      {icon}
    </IconButton>
  </Tooltip>
);

export default Header;
