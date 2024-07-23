import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TransferListCustomList from "./TransferListCustomList.jsx";
import {
  useTransferList,
  intersection,
} from "../../ProductionRecordContext/TransferListProvider.jsx";

/*
SelectAllTransferList
├── useTransferList (Custom Hook)
│   ├── state: { left, right, checked }
│   ├── handleToggle
│   ├── handleToggleAll
│   ├── handleCheckedRight
│   └── handleCheckedLeft
├── Grid
│   ├── Grid (Left List)
│   │   └── CustomList
│   │       ├── Card
│   │       │   ├── CardHeader
│   │       │   ├── Divider
│   │       │   └── List
│   │       │       ├── ListItemButton
│   │       │       │   ├── Checkbox
│   │       │       │   └── ListItemText
│   │       │       └── ...
│   ├── Grid (Buttons)
│   │   ├── Button (>)
│   │   └── Button (<)
│   └── Grid (Right List)
│       └── CustomList
│           ├── Card
│           │   ├── CardHeader
│           │   ├── Divider
│           │   └── List
│           │       ├── ListItemButton
│           │       │   ├── Checkbox
│           │       │   └── ListItemText
│           │       └── ...
└── utils
    ├── not
    ├── intersection
    └── union

*/

function AddInfomationsTransferList() {
  const { state, handleCheckedRight, handleCheckedLeft } = useTransferList();

  const { left, right, checked } = state || {};

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <TransferListCustomList title="請選模具編號" items={left} />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={intersection(checked, left).length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={intersection(checked, right).length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <TransferListCustomList
          title="已選模具編號"
          items={right}
          checked={checked}
        />
      </Grid>
    </Grid>
  );
}

export default AddInfomationsTransferList;
