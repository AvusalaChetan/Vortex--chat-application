import {lazy, Suspense, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Backdrop,
  Drawer,
  Dialog,
  DialogTitle,
} from "@mui/material";
import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcons,
  Search as SearchIcon,
  SmartToy as AiIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {darkOrange} from "../../constants/color";

const SearchBar = lazy(() => import("../specfic/SearchBar"));
const Notificaiton = lazy(() => import("../specfic/Notifications"));
const NewGroup = lazy(() => import("../specfic/NewGroup"));
const AiChat = lazy(() => import("../Shared/AiChat"));

const Header = ({mobileDrawerContent}) => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isAiChat, setIsAiChat] = useState(false);

  const handleMobile = () => setIsMobile((p) => !p);
  const openSearchBar = () => setIsSearch((p) => !p);
  const openNewGroup = () => setIsNewGroup((p) => !p);
  const toggleNotification = () => setIsNotification((p) => !p);
  const toggleAiChat = () => setIsAiChat((p) => !p);

  const navigateToGroup = () => navigate("/groups");

  const handleLogOut = () => {
    console.log("handleLogOut");
  };

  return (
    <>
      <Box sx={{flexGrow: 1, height: "4rem"}}>
        <AppBar position="static" sx={{bgcolor: "black", height: "100%"}}>
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
              <Box sx={{display: {xs: "inline-block", lg: "none"}}}>
                <IconBtn
                  title="AI Chat"
                  icon={<AiIcon />}
                  onClick={toggleAiChat}
                />
              </Box>
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

      {/* AI Chat Dialog for Mobile  */}
      <Dialog
        open={isAiChat}
        onClose={toggleAiChat}
        maxWidth="sm"
        fullWidth
        fullScreen
        sx={{
          display: {xs: "block", lg: "none"},
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "black",
            color: "white",
          }}
        >
          AI Chat Assistant
          <IconButton size="small" onClick={toggleAiChat} sx={{color: "white"}}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{height: "calc(100vh - 64px)", overflow: "hidden"}}>
          <Suspense fallback={<Backdrop open />}>
            <AiChat isMobileDialog={true} />
          </Suspense>
        </Box>
      </Dialog>

      {/* * Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isMobile}
        onClose={handleMobile}
        sx={{
          display: {xs: "block", md: "none"},
          "& .MuiDrawer-paper": {
            width: {xs: "75%", sm: "60%"},
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          onClick={handleMobile}
        >
          {mobileDrawerContent}
        </Box>
      </Drawer>
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
