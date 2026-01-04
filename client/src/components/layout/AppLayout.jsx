import {Grid} from "@mui/material";
import Header from "./Header";
import Title from "../Shared/Title";
import ChartList from "../specfic/ChartList";
import {sampleChats} from "../../constants/sampleData";
import {useParams} from "react-router-dom";

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
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            sx={{
              height: "100%",
              width: {lg: "33%", md: "50%"},
              border: "1px solid red",
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
              border: "1px solid red",
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
              bgcolor: "",
              p: 2,
              width: {lg: "30%"},
              border: "1px solid red",

              display: {xs: "none", sm: "none", md: "none", lg: "block"},
            }}
          >
            third
          </Grid>
        </Grid>

        <div>footer</div>
      </>
    );
  };
};

export default AppLayout;
