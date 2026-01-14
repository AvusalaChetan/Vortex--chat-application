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

export const InputBox = styled("input")(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "1px solid #e0e0e0",
  outline: "none",
  padding: "0.75rem 1rem",
  borderRadius: "1.5rem",
  fontSize: "0.95rem",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
  [theme.breakpoints.down("sm")]: {
    padding: "0.625rem 0.875rem",
    fontSize: "0.8rem",
  },
  "&:focus": {
    borderColor: "#1976d2",
    boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.15)",
  },
}));


export const SearchField  = styled("input")`
padding: 0.5rem 1rem;
width: 20vmax;
border: none;
outline: none;
border-radius: 1.5rem;
background-color: #f1f1f1;
font-size: 1rem;
`
export const CurveButton  = styled("button")`
cursor: pointer;
padding: 0.5rem 1rem;
color: white;
border: none;
outline: none;
border-radius: 1.5rem;
background-color: #090707ed;
font-size: 1rem;
`
