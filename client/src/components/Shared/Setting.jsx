import React, {useState} from "react";
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
  ExitToApp as ExitIcon,
} from "@mui/icons-material";
import {sampleGroups, sampleUsers} from "../../constants/sampleData";
import {useSearchParams} from "react-router-dom";

export const ChatSettings = () => {
  return <div>Chat Settings Component</div>;
};

export const GroupSettings = ({visibilityOfSetting}) => {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group");
  const group = sampleGroups.find((g) => g._id === groupId) || sampleGroups[0];

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [groupName, setGroupName] = useState(group.name);
  const [groupSubtitle, setGroupSubtitle] = useState(group.subtitle);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedNewMembers, setSelectedNewMembers] = useState([]);

  const handleEditGroup = () => {
    console.log("Group updated:", {groupName, groupSubtitle});
    setIsEditOpen(false);
  };

  const handleAddMembers = () => {
    console.log("Members added:", selectedNewMembers);
    setIsAddMemberOpen(false);
    setSelectedNewMembers([]);
  };

  const toggleMemberSelection = (userId) => {
    setSelectedNewMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleRemoveMember = (memberId) => {
    console.log("Remove member:", memberId);
  };

  const handleLeaveGroup = () => {
    if (confirm("Are you sure you want to leave this group?")) {
      console.log("Leave group:", groupId);
    }
  };

  const handleDeleteGroup = () => {
    if (
      confirm(
        "Are you sure you want to delete this group? This action cannot be undone."
      )
    ) {
      console.log("Delete group:", groupId);
    }
  };

  const initials = group.name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const BackBtn = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        py: 1,
        px: 1.5,
        borderRadius: 1,
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" fontWeight={600} color="text.primary">
        Group Settings
      </Typography>
      <IconButton
        size="small"
        onClick={() => visibilityOfSetting()}
        sx={{
          bgcolor: "action.hover",
          "&:hover": {
            bgcolor: "action.selected",
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Stack>
  );

  return (
    <Stack spacing={2.5} sx={{height: "100%", overflow: "auto", pb: 2, px: 2}}>
      {/* Group Profile Header */}
      {BackBtn}
      <Paper
        elevation={0}
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${group.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 180,
          borderRadius: 2,
          display: "flex",
          alignItems: "flex-end",
          p: 2,
          color: "white",
          position: "relative",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-end" width="100%">
          <Avatar
            src={group.cover}
            alt={group.name}
            sx={{
              width: 70,
              height: 70,
              border: "3px solid white",
              bgcolor: "primary.main",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
          <Stack flex={1}>
            <Typography variant="h6" fontWeight={700}>
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

      {/* Group Stats */}
      <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
        <Paper
          sx={{
            p: 2,
            flex: 1,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            sx={{fontWeight: 700, color: "primary.main"}}
          >
            {group.members.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Members
          </Typography>
        </Paper>
        <Paper
          sx={{
            p: 2,
            flex: 1,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            sx={{fontWeight: 700, color: "primary.main"}}
          >
            347
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Messages
          </Typography>
        </Paper>
        <Paper
          sx={{
            p: 2,
            flex: 1,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            sx={{fontWeight: 700, color: "primary.main"}}
          >
            3h
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Active
          </Typography>
        </Paper>
      </Stack>

      <Divider />

      {/* Members Section */}
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={600}>
            Members ({group.members.length})
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddMemberOpen(true)}
          >
            Add Member
          </Button>
        </Stack>

        {/* Add Members Dialog */}
        <Dialog
          open={isAddMemberOpen}
          onClose={() => {
            setIsAddMemberOpen(false);
            setSelectedNewMembers([]);
          }}
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
            Add Members
            <IconButton
              size="small"
              onClick={() => {
                setIsAddMemberOpen(false);
                setSelectedNewMembers([]);
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Stack spacing={2} p={2} maxHeight="400px" overflow="auto">
            {sampleUsers.map((user) => (
              <Paper
                key={user._id}
                sx={{
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  bgcolor: selectedNewMembers.includes(user._id)
                    ? "action.selected"
                    : "background.paper",
                  border: "1px solid",
                  borderColor: selectedNewMembers.includes(user._id)
                    ? "primary.main"
                    : "divider",
                  borderRadius: 1,
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: 1,
                  },
                }}
                onClick={() => toggleMemberSelection(user._id)}
              >
                <Avatar src={user.avatar} alt={user.name} sx={{mr: 1.5}} />
                <Stack flex={1}>
                  <Typography variant="body2" fontWeight={600}>
                    {user.name}
                  </Typography>
                </Stack>
                <Chip
                  label={
                    selectedNewMembers.includes(user._id) ? "Selected" : "Add"
                  }
                  size="small"
                  color={
                    selectedNewMembers.includes(user._id)
                      ? "primary"
                      : "default"
                  }
                  variant={
                    selectedNewMembers.includes(user._id)
                      ? "filled"
                      : "outlined"
                  }
                />
              </Paper>
            ))}
          </Stack>
          <Divider />
          <Stack direction="row" spacing={1} justifyContent="flex-end" p={2}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsAddMemberOpen(false);
                setSelectedNewMembers([]);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddMembers}
              disabled={selectedNewMembers.length === 0}
            >
              Add ({selectedNewMembers.length})
            </Button>
          </Stack>
        </Dialog>

        {/* Members List */}
        <List sx={{bgcolor: "background.paper", borderRadius: 1}}>
          {group.members.map((memberId, idx) => {
            const member = sampleUsers[idx % sampleUsers.length];
            const isAdmin = idx === 0; // First member is admin
            return (
              <React.Fragment key={memberId}>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {isAdmin && (
                        <Chip
                          label="Admin"
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      )}
                      {!isAdmin && (
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleRemoveMember(memberId)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={member.avatar} alt={member.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>
                        {member.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {isAdmin ? "Group creator" : "Joined 2 weeks ago"}
                      </Typography>
                    }
                  />
                </ListItem>
                {idx < group.members.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </List>
      </Stack>

      <Divider />

      {/* Danger Zone */}
      <Stack spacing={1.5}>
        <Typography variant="body2" fontWeight={600} color="error.main">
          Danger Zone
        </Typography>
        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
          <Button
            variant="outlined"
            color="warning"
            fullWidth
            startIcon={<ExitIcon />}
            onClick={handleLeaveGroup}
          >
            Leave Group
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<DeleteIcon />}
            onClick={handleDeleteGroup}
          >
            Delete Group
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const AppSettings = () => {
  return <div>App Settings Component</div>;
};
