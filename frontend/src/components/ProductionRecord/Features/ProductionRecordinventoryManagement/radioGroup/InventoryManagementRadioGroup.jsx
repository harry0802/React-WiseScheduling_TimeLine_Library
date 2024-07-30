import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Unstable_Grid2";
import styles from "./InventoryManagementRadioGroup.module.scss";

function RadioItem({ item }) {
  return (
    <FormControlLabel
      value={item}
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
      label={item}
    />
  );
}

function InventoryManagementRadioGroup({ data, value, onChange }) {
  return (
    <RadioGroup
      className={styles["InventoryManagement-radioGroup"]}
      aria-label="原物料分類"
      name="controlled-radio-buttons-group"
      value={value}
      onChange={onChange}
    >
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={index}>
            <RadioItem item={item} />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
}

export default InventoryManagementRadioGroup;
