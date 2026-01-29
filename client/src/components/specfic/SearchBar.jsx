import {useInputValidation} from "6pp";
import {Search as SearchIcon} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/apis/api";
import {setIsSearch} from "../../redux/reducers/misc";
import UserItem from "../Shared/UserItem";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const SearchBar = ({InputProps = {}, open = true, onClose}) => {
  const {isSearch} = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
 await sendFriendRequest("Sending friend request...", { userId: id });
  };


  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then((res) => {
          if (res.data?.users) {
            console.log(res.data.users);
            setUsers(res.data.users);
          } else {
            setUsers([]);
          }
        })
        .catch((err) => {
          console.log("Search error:", err);
          setUsers([]);
        });
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 500,
          m: "auto",
          position: "relative",
        },
      }}
    >
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
                handler={addFriendHandler}
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
