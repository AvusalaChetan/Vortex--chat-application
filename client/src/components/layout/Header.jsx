import {
  Add as AddIcon,
  SmartToy as AiIcon,
  Close as CloseIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcons,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  Dialog,
  DialogTitle,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import {lazy, Suspense, useState, useCallback} from "react";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {server} from "../../constants/config";
import {useDispatch, useSelector} from "react-redux";
import {userNotExists} from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsSearch,
  setIsNotification,
} from "../../redux/reducers/misc";
import {getErrorMessage} from "../../hooks/hook";

const SearchBar = lazy(() => import("../specfic/SearchBar"));
const Notifications = lazy(() => import("../specfic/Notifications"));
const NewGroup = lazy(() => import("../specfic/NewGroup"));
const AiChat = lazy(() => import("../Shared/AiChat"));

const Header = ({isMobileDrawerOpen, mobileDrawerContent}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isSearch, isMobile, isNotification} = useSelector(
    (state) => state.misc,
  );

  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isAiChat, setIsAiChat] = useState(false);

  const handleMobile = () => dispatch(setIsMobile(!isMobile));
  const openSearchBar = () => dispatch(setIsSearch(!isSearch));
  const openNewGroup = () => setIsNewGroup((p) => !p);
  const toggleNotification = () => dispatch(setIsNotification(true));
  const toggleAiChat = () => setIsAiChat((p) => !p);

  const navigateToGroup = () => navigate("/groups");

  const handleLogOut = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Box sx={{flexGrow: 1, height: "4rem"}}>
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            height: "100%",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{display: {xs: "none", md: "none", lg: "block"}}}
            >
              vortex
            </Typography>

            <Box sx={{display: {xs: "block", sm: "block", md: "none"}}}>
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
              <Box sx={{display: {xs: "inline-block", lg: "inline-block"}}}>
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
          <Notifications open={isNotification} />
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
        open={isMobileDrawerOpen}
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
        >
          {mobileDrawerContent}
          {/* Sidebar will render from AppLayout */}
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
