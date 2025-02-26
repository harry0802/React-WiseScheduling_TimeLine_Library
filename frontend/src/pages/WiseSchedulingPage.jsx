import React, { useState } from "react";
import WiseSchedulingIndex from "../components/WiseScheduling";
import DynamicTimeline from "../components/WiseScheduling/components/schedule";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";

const WiseSchedulingPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="機台狀態看板" />
          <Tab label="排程時間軸" />
        </Tabs>
      </Paper>

      {activeTab === 0 && <WiseSchedulingIndex />}
      {activeTab === 1 && <DynamicTimeline />}
    </Box>
  );
};

export default WiseSchedulingPage;
