import {Grid} from "@mui/material";
import Header from "./Header";
import Title from "../Shared/Title";
import ChartList from "../specfic/ChartList";
import {sampleChats} from "../../constants/sampleData";
import {useParams} from "react-router-dom";
import ProfileCard from "../specfic/ProfileCard";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("delet chat", _id, groupChat);
    };
  

    return (
      <>
        <Title />
        <Header />
        <Grid
          container
          sx={{
            height: "calc(100vh - 4rem)",
            width: "100%",
            padding: "0.2rem 0.5rem",
            boxSizing: "border-box",
            // justifyContent: "space-between",
            alignItems: "stretch",
            columnGap: {md: 2, lg: 4},
          }}
        >
          {/* //left */}
          <Grid
            size={{xs: 12, md: 4, lg: 3}}
            sx={{
              height: "100%",
              ml: 0.5,
              display: {xs: "none", sm: "none", md: "block"},
              borderRight: 1,
              borderColor: "divider",
              pr: 2,
              overflowY: "auto",
              bgcolor: "background.paper",
              width: {lg: "20%", md: "33%"},
            }}
          >
            <ChartList
              chats={sampleChats}
              chatId={chatId}
              handleDleteChat={handleDleteChat}
            />
          </Grid>

          {/* chat mgs (or) middle part */}
          <Grid
            size={{xs: 12, md: 8, lg: 5}}
            sx={{
              height: "100%",
              width: {lg: "55%", md: "60%", sm: "100%"},
              p: 2,
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: {md: 1, lg: 1},
            }}
          >
            <WrappedComponent {...props} />
          </Grid>

          {/* user info part */}
          <Grid
            size={{xs: 12, lg: 4}}
            sx={{
              height: "100%",
              width: {lg: "20%"},
              p: 2,
              bgcolor: "black",
              color: "white",

              display: {xs: "none", sm: "none", md: "none", lg: "block"},
            }}
          >
            <ProfileCard />
          </Grid>
        </Grid>

        <div>footer</div>
      </>
    );
  };
};

export default AppLayout;
