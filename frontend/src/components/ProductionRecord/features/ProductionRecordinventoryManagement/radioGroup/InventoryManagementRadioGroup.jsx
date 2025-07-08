import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { StyledInventoryRadioGroup } from "./InventoryManagementRadioGroup.styled";
/* ASCII 
InventoryManagementRadioGroup
│
├── RadioGroup
│   └── Grid (Container)
│       ├── Grid Item
│       │   └── RadioItem
│       │       └── FormControlLabel
│       │           ├── Radio
│       │           └── Label
│       ├── Grid Item
│       │   └── RadioItem
│       │       └── FormControlLabel
│       │           ├── Radio
│       │           └── Label
│       ├── ...
│       └── Grid Item
│           └── RadioItem
│               └── FormControlLabel
│                   ├── Radio
│                   └── Label

*/
function RadioItem({ item }) {
  return (
    <FormControlLabel
      key={item.id}
      value={item.id}
      label={item.materialType}
      control={
        <Radio
          sx={{
            color: "#8F8F8F",
            "&.Mui-checked": {
              color: "#8F8F8F",
            },
          }}
        />
      }
    />
  );
}

function InventoryManagementRadioGroup({ data, value, onChange }) {
  return (
    <StyledInventoryRadioGroup
      aria-label="原物料分類"
      name="controlled-radio-buttons-group"
      value={value}
      onChange={onChange}
    >
      <Grid container spacing={2}>
        {data &&
          data.map((item, index) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
              <RadioItem item={item} />
            </Grid>
          ))}
      </Grid>
    </StyledInventoryRadioGroup>
  );
}

export default InventoryManagementRadioGroup;
