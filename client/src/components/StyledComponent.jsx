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
  text-decoration: none;
  color: gray;
  padding: 1rem;
  display: block;
  background-color: white;
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
  outline: none;
  padding: 0.75rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.95rem;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.15);
  }
`;
