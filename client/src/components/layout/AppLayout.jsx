import {Drawer, Grid, Skeleton, Stack} from "@mui/material";
import {lazy, Suspense, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import {sampleGroups} from "../../constants/sampleData";
import {useMyChatsQuery} from "../../redux/apis/api";
import Title from "../Shared/Title";
import ChartList from "../specfic/ChartList";
import GroupList from "../specfic/GroupList";
import Header from "./Header";
import {setIsMobile} from "../../redux/reducers/misc";
import {useErrors} from "../../hooks/hook";
import Profile from "../specfic/Profile";

const AppLayout = (WrappedComponent) => {
  const AiChat = lazy(() => import("../Shared/AiChat"));
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const {isMobile} = useSelector((state) => state.misc);
    const {user, loader} = useSelector((state) => state.auth);
    const {isLoading, data, isError, error, refetch} = useMyChatsQuery("");

    useErrors([{isError, error}]);

    // Safety check - ensure chats is an array
    const chats = Array.isArray(data?.chats) ? data?.chats : [];

    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const groupId = searchParams.get("group");

    const handleDleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("delet chat", _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    return (
      <>
        <Title
          title="group chats"
          description="Manage your group chats effectively"
        />
        <Header
          isMobileDrawerOpen={isMobileDrawerOpen}
          setIsMobileDrawerOpen={setIsMobileDrawerOpen}
          mobileDrawerContent={
            location.pathname === "/groups" ? (
              <GroupList myGroup={sampleGroups} groupId={groupId} />
            ) : isLoading ? (
              <Skeleton />
            ) : null
          }
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChartList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDleteChat={handleDleteChat}
            />
          </Drawer>
        )}

        <Grid
          container
          sx={{
            height: "calc(100vh - 4rem)",
            width: "100%",
            padding: {
              xs: "0.1rem 0.25rem",
              sm: "0.2rem 0.5rem",
              md: "0.5rem 1rem",
            },
            boxSizing: "border-box",
            alignItems: "stretch",
            justifyContent: "center",
            columnGap: {xs: 0.5, md: 2},
          }}
        >
          {/* //left */}
          <Grid
            size={{xs: 12, md: 4, lg: 3}}
            sx={{
              height: "100%",
              ml: {xs: 0, sm: 0.5},
              display: {xs: "none", sm: "none", md: "block"},
              borderRight: 1,
              borderColor: "divider",
              pr: {xs: 1, sm: 2},
              overflowY: "auto",
              bgcolor: "background.paper",
              width: {lg: "20%", md: "33%"},
            }}
          >
            {location.pathname === "/groups" ? (
              <GroupList myGroup={sampleGroups} groupId={groupId} />
            ) : isLoading ? (
              <Skeleton />
            ) : isError ? (
              <div style={{ padding: "1rem", textAlign: "center", color: "#999" }}>
                Failed to load chats. Please try refreshing.
              </div>
            ) : (
              <ChartList
                w="70vw"
                chats={chats}
                chatId={chatId}
                handleDleteChat={handleDleteChat}
              />
            )}
          </Grid>

          {/* chat mgs (or) middle part */}
          <Grid
            size={{xs: 12, md: 8, lg: 5}}
            sx={{
              height: "100%",
              width: {lg: "55%", md: "60%", sm: "100%"},
              p: {xs: 1, sm: 1.5, md: 2},
              overflow: "hidden",
              borderRadius: {xs: 1, sm: 2},
              boxShadow: {md: 1, lg: 1},
            }}
          >
            <WrappedComponent {...props} />
          </Grid>

          {/* AI Chat section */}
          <Grid
            size={{xs: 12, lg: 4}}
            sx={{
              height: "100%",
              width: {lg: "20%"},
              display: {xs: "none", sm: "none", md: "none", lg: "flex"},
              flexDirection: "column",
              borderLeft: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              overflow: "hidden",
              borderRadius: {xs: 1, sm: 2},
              boxShadow: {lg: 1},
            }}
          >
            {loader ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : user ? (
              <>
                {/* <Profile user={user} /> */}
                <Suspense fallback={<div>Loading AI Chat...</div>}>
                  <AiChat />
                </Suspense>
              </>
            ) : (
              <div>No user data</div>
            )}
          </Grid>
        </Grid>

        {/* <div>footer</div> */}
      </>
    );
  };
};

export default AppLayout;
