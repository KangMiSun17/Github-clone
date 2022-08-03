import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Repositories from "../pages/repositories/Repositories";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import OverView from "../pages/overview/OverView";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuValueState } from "../stores/atom";

function Menu() {
  const navigate = useNavigate();
  const [value, setValue] = useRecoilState(menuValueState);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            icon={<HomeOutlinedIcon />}
            iconPosition="start"
            label="Overview"
            onClick={() => navigate("/")}
          />
          <Tab
            icon={<ClassOutlinedIcon />}
            iconPosition="start"
            label="Repositories"
            onClick={() => navigate("/repositories")}
          />
        </Tabs>
      </Box>
      <Routes>
        <Route index element={<OverView />} />
        <Route path={`/repositories`} element={<Repositories />} />
      </Routes>
    </Box>
  );
}

export default Menu;
