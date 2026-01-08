import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, {useRef} from "react";
import {
  Image as ImageIcon,
  AudioFile as AudioFileIcon,
  VideoFile as VideoFileIcon,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";

const FileMenu = ({anchorEl, chatId}) => {
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const closeFileMenu = () => {
    anchorEl = null;
  };

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5) {
      console.warn(`You can only send 5 ${key} at a time`);
      return;
    }

    // TODO: Implement file upload functionality
    console.log("Selected files:", files);
    console.log("File type:", key);
    console.log(`${files.length} ${key}(s) selected`);
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeFileMenu}>
      <div style={{width: "10rem"}}>
        <MenuItem onClick={selectImage}>
          <Tooltip title="Image">
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText>Image</ListItemText>
        </MenuItem>

        <MenuItem onClick={selectAudio}>
          <Tooltip title="Audio">
            <ListItemIcon>
              <AudioFileIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText>Audio</ListItemText>
        </MenuItem>

        <MenuItem onClick={selectVideo}>
          <Tooltip title="Video">
            <ListItemIcon>
              <VideoFileIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText>Video</ListItemText>
        </MenuItem>

        <MenuItem onClick={selectFile}>
          <Tooltip title="File">
            <ListItemIcon>
              <UploadFileIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText>File</ListItemText>
        </MenuItem>
      </div>

      <input
        type="file"
        multiple
        accept="image/png, image/jpeg, image/gif, image/webp"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "Images")}
        ref={imageRef}
      />

      <input
        type="file"
        multiple
        accept="audio/mpeg, audio/wav"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "Audios")}
        ref={audioRef}
      />

      <input
        type="file"
        multiple
        accept="video/mp4, video/webm, video/ogg"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "Videos")}
        ref={videoRef}
      />

      <input
        type="file"
        multiple
        accept="*"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "Files")}
        ref={fileRef}
      />
    </Menu>
  );
};

export default FileMenu;
