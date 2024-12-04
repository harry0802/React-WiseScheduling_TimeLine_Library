// always import

import React from "react";

import { Tabs, Tab } from "@mui/material";
import { ProcessFormStyles } from "../ProcessForm.styles";
import FormItems from "./FormItems";

const ProcessSections = React.memo(({ sections, activeTab, onTabChange }) => {
  if (sections.length === 0) return null;

  return (
    <>
      <Tabs
        sx={ProcessFormStyles.tabs}
        value={activeTab}
        onChange={onTabChange}
      >
        {sections.map((section, index) => (
          <Tab key={index} label={section.title} />
        ))}
      </Tabs>
      {sections[activeTab] && <FormItems items={[sections[activeTab]]} />}
    </>
  );
});

export default ProcessSections;
