import {useState} from "react";
import {
  Dialog,
  Box,
  Stack,
  TextField,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import {useInputValidation} from "6pp";
import UserItem from "../Shared/UserItem";
import {sampleUsers} from "../../constants/sampleData";

const SearchBar = ({InputProps = {}, open = true, onClose }) => {
  const [users, setUsers] = useState(sampleUsers);
  const search = useInputValidation("");

  const addFriendHandler = (userId) => {
    console.log("Add friend with ID:", userId);
  };
  const isLoadingSendFriendRequest = false;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 500,
          m: "auto",
          position: "relative",
        },
      }}
    >
     
        <button style={{ 
          display:'inline' ,
          width: 'fit-content',
          position:'absolute',
          right: '10px',
          top: '20px',
          fontSize: '16px',
          textAlign:'center'
        }}
        >x</button>
      
      <DialogTitle>Search</DialogTitle>

      <Stack px={2} pb={2}>
        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            ...InputProps,
          }}
        />

        <List>
          {users.map((user, index) => (
            <ListItem key={index}>
              <UserItem
                user={user}
                key={user._id}
                handle={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchBar;
