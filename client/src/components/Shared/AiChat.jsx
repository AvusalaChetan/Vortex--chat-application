import {Grid, Stack, IconButton, Typography} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import {InputBox} from "../../components/StyledComponent";

const AiChat = () => {
  return (
<>
<Typography variant="body1" color="initial" textAlign='center'>
    AI Chat 
</Typography>
    <Grid
      item
      xs={0}
      md={1}
      size={6}
      sx={{
        height: "100vh",
        border: "1px solid red",
        width: "100%",
      }}
    >
        
      <Stack
        sx={{
          flexGrow: 1,
          border: "1px solid red",
          height: "86.5%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* showing messages */}
        
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        px={1}
        sx={{
          border: "1px solid red",
          mx: "auto",
          marginTop: "0.5rem",
          // height: "100%",
        }}
      >
        <IconButton
          color="primary"
          // onClick={handleFileOpen}
        >
          <AttachFileIcon />
        </IconButton>

        <Stack flex={1}>
          <InputBox
            placeholder="chat with AI..."
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
          />
        </Stack>

        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Stack>
    </Grid>
</>
  );
};

export default AiChat;
