import { Link, List } from "@mui/material";
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
  height: "1.8rem",
  width: "20rem",
  border: "1px solid #a7a7a7",
  borderRadius: "0.3rem",
  display: "flex",
  alignItems: "center",
  marginRight: 10,
  padding: "0.2rem 0.4rem",
}));

export const SearchInput = styled("input")(() => ({
  fontSize: "0.8rem",
  width: "100%",
  border: "none",
  outline: "none",
  margin: 0,
}));

export const EachRepo = styled("div")(() => ({
  margin: "1.2rem 0.5rem",
}));

export const RepoLanguageColor = styled("span")(({ languageColor }: { languageColor: string }) => ({
  width: 10,
  height: 10,
  borderRadius: "100%",
  backgroundColor: languageColor,
  marginRight: 5,
}));

export const RepoTitle = styled(Link)(() => ({
  fontSize: 20,
  marginRight: 8,
  fontWeight: "bolder",
}));

export const RepoVisibility = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
  height: 20,
  fontSize: 12,
  fontWeight: "500",
  color: "#57606a",
  padding: "0 0.6rem",
  border: "1px solid gray",
  borderRadius: 20,
}));

export const RepoDescription = styled("div")(() => ({
  marginTop: "0.5rem",
  color: "#57606a",
}));

export const RepoTopics = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
}));

export const RepoTopic = styled("span")(() => ({
  fontSize: 12,
  fontWeight: "500",
  backgroundColor: "#ddf4ff",
  color: "#0969da",
  margin: 5,
  marginLeft: 0,
  padding: "0.3rem 0.8rem",
  borderRadius: 20,
}));

export const RepoOption = styled(FlexBox)(() => ({
  margin: 0,
  marginRight: 12,
  fontSize: 12,
  color: "#57606a",
}));

export const MovePage = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  margin: "1rem 0",
}));
