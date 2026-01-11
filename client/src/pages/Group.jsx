import GroupList from "../components/specfic/GroupList";
import {lazy, Suspense, useMemo, useState} from "react";
import {Grid, Stack, IconButton,Typography} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {InputBox} from "../components/StyledComponent";
import MoreOptions from "../components/Shared/MoreOptions";
import {sampleGroups, sampleChats} from "../constants/sampleData";
import {useSearchParams} from "react-router-dom";

const AiChat = lazy(() => import("../components/Shared/AiChat"));

const Group = () => {
   const [searchParams] = useSearchParams();
   const [isMoreOpen, setIsMoreOpen] = useState(true);
   
  const groupId = searchParams.get("group");

const handlingMoreOptionsClick = () => {
    setIsMoreOpen((prev => !prev));
  }
  // Find the selected group
  const selectedGroup = useMemo(() => {
    return sampleGroups.find((group) => group._id === groupId);
  }, [groupId]);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
      spacing={1}
    >
      <Grid
        item
        xs={12}
        sx={{
          height: "100vh",
        }}
        size={3}
      >
        <GroupList myGroup={sampleGroups} groupId={groupId} />
      </Grid>

      <Grid
        item
        xs={0}
        md={1}
        size={6}
        sx={{
          height: "100vh",
          border: "1px solid red",
          position:'relative',

        }}
      >
        {selectedGroup ? (
          <>
            <Stack
              direction="column"
              alignItems="center"
              spacing={0.5}
              height="8%"
            >
              <Typography variant="h6">{selectedGroup.name}</Typography>
              <Typography variant="subtitle2" color="gray">{selectedGroup.subtitle}</Typography >
            </Stack>
            <Stack
              sx={{
                flexGrow: 1,
                border: "1px solid red",
                height: "82%",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {/* Show messages for selectedGroup here */}
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
                  placeholder="Type a message..."
                  // value={message}
                  // onChange={(e) => setMessage(e.target.value)}
                />
              </Stack>

              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>

              <IconButton color="primary.text" onClick={handlingMoreOptionsClick}>
               {isMoreOpen ? 'x': <MoreVertIcon
                />}
                <MoreOptions isOpen={isMoreOpen} />
              </IconButton>
            </Stack>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            Select a group to chat
          </div>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        size={3}
        sx={{
          height: "100vh",
          border: "1px solid red",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AiChat />
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default Group;
