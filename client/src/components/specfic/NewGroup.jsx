import {useState} from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import UserItem from "../Shared/UserItem";
import {sampleUsers} from "../../constants/sampleData";

const NewGroup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] =
    useState(false);

  const selectMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((memberId) => memberId !== id)
        : [...prev, id]
    ); 
  };

  console.log(selectedMembers)

  const handleCreate = () => {
    // Handle group creation logic
    console.log("Creating group:", {groupName, selectedMembers});
    setIsOpen(false);
    setGroupName("");
    setSelectedMembers([]);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          mx: "auto",
          display: "block",
          mt: 2,
          mb: 2,
        }}
        onClick={() => setIsOpen(true)}
      >
       create New Group
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>New Group</DialogTitle>
        <Stack spacing={2} p={2}>
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
          />
          <Typography variant="h6">Select Members:</Typography>
          <Stack spacing={1} maxHeight="300px" overflow="auto">
            {sampleUsers.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={() => selectMember(user._id)}
                isSelected={selectedMembers.includes(user._id)}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={!groupName|| selectedMembers.length === 0}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setIsOpen(false);
                setGroupName("");
                setSelectedMembers([]);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default NewGroup;
