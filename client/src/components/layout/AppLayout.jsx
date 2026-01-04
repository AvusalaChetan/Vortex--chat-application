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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            lg={2.5}
            sx={{
              height: "100%",
              ml: 0.5,
              display: {xs: "none", sm: "none", md: "block"},
            }}
          >
            <ChartList
              chats={sampleChats}
              chatId={chatId}
              handleDleteChat={handleDleteChat}
            />
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
              width: {lg: "33%", md: "50%", sm: "90%", xs: "100%"},
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
              p: 2,
              width: "22%",
              border: " ",
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
