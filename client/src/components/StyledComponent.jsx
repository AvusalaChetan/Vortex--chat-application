// import styled from "@emotion/styled";
import {styled} from "@mui/material";
import {Link as LinkComponet} from "react-router-dom";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponet)`
text-decoration:none;
color:gray;
padding:1rem;
background-color:white;
&:hover{
background-color:rgba(0,0,0,0.1)
}
`;
