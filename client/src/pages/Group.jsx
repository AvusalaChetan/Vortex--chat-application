// Redux slice (groups.js)
// - groupsSlice with state for:
//   - selectedGroup (or groups list)
//   - groupInfo (name, subtitle, members, etc.)
//   - loading/error states
//   - actions: fetchGroup, updateGroup, addMember, removeMember, deleteGroup

import React, {useState, useRef, memo} from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Stack,
  Paper,
  Avatar,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import {sampleGroups, sampleUsers} from "../constants/sampleData";
import {useSearchParams} from "react-router-dom";
import FileMenu from "../components/dialogs/FileMenu";
import MoreOptions from "../components/Shared/MoreOptions";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {InputBox} from "../components/StyledComponent";
import {sampleMessages} from "../constants/sampleData";
import MessageComponenets from "../components/Shared/MessageComponenets";
import {v4 as uuidV4} from "uuid";
import {GroupSettings} from "../components/Shared/Setting";

const Group = () => {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group");
  console.log("group id :", groupId);
  const group = sampleGroups.find((g) => g._id === groupId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [groupName, setGroupName] = useState(group?.name || '');
  const [groupSubtitle, setGroupSubtitle] = useState(group?.subtitle || '');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedNewMembers, setSelectedNewMembers] = useState([]);

  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const visibilityOfSetting = () => {
    setIsSetting((prev) => !prev);
    setIsOpen(false);
  };

  const handleEditGroup = () => {
    console.log("Group updated:", {groupName, groupSubtitle});
    setIsEditOpen(false);
  };

  const handleFileOpen = (e) => {
    setFileMenuAnchor(e.currentTarget);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Message submitted:");
    setMessage("");
  };

  return (
    <Stack spacing={1} sx={{height: "100%", overflow: "auto"}}>
      {isSetting ? (
        <GroupSettings visibilityOfSetting={visibilityOfSetting} />
      ) : (
        <>
          {groupId === null||undefined ? (
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
              mt={4}
            >
              No group selected. Please select a group to view messages.
            </Typography>
          ) : (
            <>
              <GroupHeader
                group={group}
                setIsEditOpen={setIsEditOpen}
                isEditOpen={isEditOpen}
                groupName={groupName}
                groupSubtitle={groupSubtitle}
                setGroupName={setGroupName}
                setGroupSubtitle={setGroupSubtitle}
                handleEditGroup={handleEditGroup}
              />
              <Divider />

              <Stack
                ref={containerRef}
                boxSizing={"border-box"}
                spacing={1}
                sx={{
                  flexGrow: 1,
                  overflowX: "hidden",
                  overflowY: "auto",
                  backgroundImage: `url("/imgs/tree.png")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: 2,
                  p: {xs: 0.75, sm: 1},
                }}
              >
                {/* message container */}
                {sampleMessages.map((message) => (
                  <MessageComponenets key={uuidV4()} message={message} />
                ))}
              </Stack>
              <form
                onSubmit={submitHandler}
                style={{
                  flexShrink: 0,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{xs: 0.5, sm: 1}}
                  sx={{
                    px: {xs: 0.5, sm: 1},
                    py: {xs: 0.75, sm: 1},
                    mt: {xs: 0.5, sm: 0.75},
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={handleFileOpen}
                    size="small"
                    sx={{
                      p: {xs: 0.75, sm: 1},
                    }}
                  >
                    <AttachFileIcon fontSize="small" />
                  </IconButton>

                  <Stack flex={1} sx={{minWidth: 0}}>
                    <InputBox
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      sx={{
                        fontSize: {xs: "0.8rem", sm: "0.95rem"},
                        padding: {xs: "0.625rem 0.875rem", sm: "0.75rem 1rem"},
                      }}
                    />
                  </Stack>

                  <IconButton
                    type="submit"
                    color="primary"
                    size="small"
                    sx={{
                      p: {xs: 0.75, sm: 1},
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    color="primary.text"
                    size="small"
                    sx={{
                      p: {xs: 0.7},
                      fontSize: "small",
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <MoreVertIcon fontSize="small" />
                    <MoreOptions
                      isOpen={isOpen}
                      visibilityOfSetting={visibilityOfSetting}
                    />
                  </IconButton>
                </Stack>
              </form>

              <FileMenu anchorEl={fileMenuAnchor} chatId="testChatId" />
            </>
          )}
        </>
      )}

      <FileMenu anchorEl={fileMenuAnchor} chatId="testChatId" />
    </Stack>
  );
};

const GroupHeader = memo(
  ({
    group,
    setIsEditOpen,
    isEditOpen,
    groupName,
    groupSubtitle,
    setGroupName,
    setGroupSubtitle,
    handleEditGroup,
  }) => {
    // Get display initials for avatar
    const initials = group.name
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <>
        <Paper
          elevation={0}
          sx={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${group.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 100,
            borderRadius: 2,
            display: "flex",
            alignItems: "flex-end",
            color: "white",
            position: "relative",
            p: 1,
          }}
        >
          <Stack direction="row" 
          spacing={2} alignItems="flex-end" width="100%">
            <Avatar
              src={group.cover}
              alt={group.name}

              sx={{
                width: 80,
                height: 80,
                border: "4px solid white",
                bgcolor: "primary.main",
                fontSize: 32,
                fontWeight: 700,
                mb: 1,
                
              }}
            >
              {initials}
            </Avatar>
            <Stack flex={1}>
              <Typography variant="h5" fontWeight={700}>
                {group.name}
              </Typography>
              <Typography variant="body2" sx={{opacity: 0.9}}>
                {group.subtitle}
              </Typography>
            </Stack>
            <IconButton
              size="small"
              sx={{color: "white"}}
              onClick={() => setIsEditOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </Stack>
        </Paper>

        {/* Edit Group Dialog */}
        <Dialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Edit Group
            <IconButton size="small" onClick={() => setIsEditOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Stack spacing={2} p={2}>
            <TextField
              label="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              value={groupSubtitle}
              onChange={(e) => setGroupSubtitle(e.target.value)}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleEditGroup}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Dialog>
      </>
    );
  }
);

export default AppLayout(Group);
