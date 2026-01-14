import React from "react";
import {
  Avatar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import {Link} from "../StyledComponent";
import {v4 as uuidV4} from 'uuid'


const GroupList = ({groupId, myGroup = []}) => {
  return (
    <>
      <Typography variant="h6" textAlign={"center"}>
        All Groups
      </Typography>
      <Stack
        component="nav"
        sx={{
          height: "100vh",
          color: "text.primary",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <List disablePadding>
          {myGroup.map((group) => (
            <React.Fragment key={uuidV4()}>
              <Divider component="li" />
              <GroupItem
                _id={group._id}
                {...group}
                groupId={groupId}
                isSelected={groupId === group._id}
              />
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Stack>
    </>
  );
};

const GroupItem = ({groupId, isSelected, ...groups}) => {
  const {_id, name = "Untitled", subtitle = "", avatarColor, cover} = groups;

  // initials from name
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Link
      to={`?group=${_id}`}
      style={{textDecoration: "none", color: "inherit"}}
    >
      <ListItemButton
        selected={isSelected}
        sx={{
          px: 1.5,
          py: 1,
          borderRadius: 2,
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={cover}
            alt={name}
            sx={{
              bgcolor: avatarColor || "primary.main",
              width: 40,
              height: 40,
              fontWeight: 700,
            }}
            loading="lazy"
          >
            {!cover && initials}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "inherit",
                letterSpacing: 0.2,
              }}
            >
              {name}
            </Typography>
          }
          secondary={
            subtitle ? (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{display: "block", mt: 0.25}}
              >
                {subtitle}
              </Typography>
            ) : null
          }
        />
      </ListItemButton>
    </Link>
  );
};

export default GroupList;
