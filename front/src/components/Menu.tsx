import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import Repositories from "../pages/Repositories";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Menu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            icon={<HomeOutlinedIcon />}
            iconPosition="start"
            label="Overview"
            {...a11yProps(0)}
          />
          <Tab
            icon={<ClassOutlinedIcon />}
            iconPosition="start"
            label="Repositories"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Overview 페이지입니다.
      </TabPanel>
      <Repositories value={value} index={1} />
    </Box>
  );
}

export default Menu;
