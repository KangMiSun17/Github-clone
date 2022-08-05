import { List } from "@mui/material";
import { styled } from "@mui/material/styles";

export const RepoList = styled(List)(() => ({
  border: "1px solid gray",
  borderRadius: 10,
  padding: 18,
}));

export const BoldText = styled("span")(() => ({
  fontWeight: "bold",
}));

export const ClearButton = styled("button")(() => ({
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  color: "gray",
}));

export const FlexBox = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
  marginTop: 5,
  flexWrap: "wrap",
}));

export const FilterContainer = styled(FlexBox)(() => ({
  justifyContent: "space-between",
  margin: 5,
  padding: 5,
  fontSize: 14,
}));

export const SearchBox = styled("form")(() => ({
  height: "1.5rem",
  width: "20rem",
  border: "1px solid #a7a7a7",
  borderRadius: "0.3rem",
  display: "flex",
  padding: "0.2rem 0.4rem",
}));

export const SearchInput = styled("input")(() => ({
  fontSize: "0.8rem",
  width: "100%",
  border: "none",
  outline: "none",
  margin: 0,
}));
