import React from "react";
import Menu from "./components/Menu";
import { styled } from "@mui/material/styles";

function App() {
  return (
    <div>
      <Title className="App">
        <img src="https://avatars.githubusercontent.com/u/69631?s=60&v=4" alt="로고" />
        Meta
      </Title>
      <Menu></Menu>
    </div>
  );
}

export default App;

const Title = styled("h1")(() => ({
  display: "flex",
  alignItems: "center",
}));
