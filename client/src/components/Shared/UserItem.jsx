import {Add as AddIcon} from "@mui/icons-material";

import {
  IconButton,
  ListItem,
  Typography,
  Avatar,
  Stack,
  List,
} from "@mui/material";
import {memo} from "react";
const UserItem = ({user, handle, handlerIsLoading}) => {
  const {name, _id, avatar} = user;
  return (
    <List>
      <ListItem
        sx={{
          p: 1.5,
          borderRadius: 2,
          boxShadow: 1,
          transition: "box-shadow 0.2s, background 0.2s",
          "&:hover": {
            boxShadow: 4,
            background: "rgba(0,0,0,0.03)",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Avatar
            src={avatar}
            sx={{width: 44, height: 44, borderRadius: 2, boxShadow: 2}}
          />
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              ml: 2,
              fontWeight: 500,
              color: "text.primary",
              letterSpacing: 0.2,
            }}
          >
            {name}
          </Typography>
          <IconButton
            size="medium"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              boxShadow: 2,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "primary.dark",
                boxShadow: 4,
                transform: "scale(1.08)",
              },
              transition: "all 0.2s",
            }}
            onClick={() => handle(_id)}
            disabled={handlerIsLoading}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </ListItem>
    </List>
  );
};

export default memo(UserItem);
