import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {memo, useEffect} from "react";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/apis/api";
import {useDispatch} from "react-redux";
import {setIsNotification} from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import {getErrorMessage} from "../../hooks/hook";

const Notifications = ({open = false}) => {
  const {isLoading, data, error, isError} = useGetNotificationsQuery(
    undefined,
    {
      skip: !open,
    },
  );

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const dispatch = useDispatch();

  const friendReqHandler = async ({_id, accept}) => {
    dispatch(setIsNotification(false));
    console.log("Friend request", _id, accept);
    try {
      const res = await acceptFriendRequest({requestId: _id, accept});
      if (res?.data?.success) {
        console.log("use socket here");
        toast.success(res.data.message);
      } else {
        toast.error(getErrorMessage(res?.error));
      }
    } catch (error) {
      console.log("Error accepting/rejecting friend request:", error);
      toast.error(getErrorMessage(error));
    }
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  // Only show error if it's a significant error, not for initial load
  useEffect(() => {
    if (isError && error && open) {
      toast.error(getErrorMessage(error));
    }
  }, [isError, error, open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={closeHandler}
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
          {isLoading ? (
            <Stack spacing={1.5}>
              {[1, 2, 3].map((i) => (
                <Stack key={i} direction="row" spacing={2} alignItems="center">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="20%" height={20} />
                </Stack>
              ))}
            </Stack>
          ) : (
            <List>
              {data?.requests?.length > 0 ? (
                data.requests.map((notification) => (
                  <NotificationItem
                    key={notification._id}
                    sender={notification.sender}
                    _id={notification._id}
                    handler={friendReqHandler}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{py: 2}}>
                  No new notifications
                </Typography>
              )}
            </List>
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
