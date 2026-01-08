import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";

const Notifications = ({open = true, onClose}) => {
  
  const friendReqHandler = ({_id, accept}) => {
    // handle friend request accept/reject here
  };

  return (
  <>
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          m: 0,
          borderRadius: 3,
        },
      }}
    >
      <Stack p={2}>
        <DialogTitle sx={{p: 0, mb: 2, fontSize: 18}}>
          Notifications
        </DialogTitle>
        {sampleNotifications.length > 0 ? (
          <List sx={{width: "100%", p: 0}}>
            {sampleNotifications.map((i) => (
              <NotificationItem
                _id={i._id}
                sender={i.sender}
                handler={friendReqHandler}
                key={i._id}
              />
            ))}
          </List>
        ) : (
          <Typography color="text.secondary" align="center" sx={{py: 2}}>
            No notifications
          </Typography>
        )}
      </Stack>
    </Dialog>
  </>
  );
};



const NotificationItem = memo(({sender, _id, handler}) => {
  const {name, avatar} = sender;
  return (
    <ListItem
      sx={{
        py: 1.5,
        px: 0,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" width="100%">
        <Avatar src={avatar} sx={{width: 40, height: 40}} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            color: "text.secondary",
          }}
        >
          {name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => handler({_id, accept: true})}
            size="small"
            variant="text"
            color="primary"
            sx={{textTransform: "uppercase", fontSize: 12, fontWeight: 600}}
          >
            Accept
          </Button>
          <Button
            onClick={() => handler({_id, accept: false})}
            size="small"
            variant="text"
            color="error"
            sx={{textTransform: "uppercase", fontSize: 12, fontWeight: 600}}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
