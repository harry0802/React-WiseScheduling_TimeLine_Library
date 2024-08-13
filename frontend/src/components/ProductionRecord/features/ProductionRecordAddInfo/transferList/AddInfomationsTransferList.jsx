import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TransferListCustomList from "./TransferListCustomList.jsx";
import { useTransferListSlice } from "../../../slice/TransferListSlice.jsx";

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

function AddInfomationsTransferList({ type = "屬性" }) {
  const { left, right, checked, moveRight, moveLeft, intersection } =
    useTransferListSlice();

  return (
    <Grid
      className="transferList__container"
      container
      spacing={3}
      justifyContent="start"
      alignItems="center"
    >
      <Grid className="transferList__item" item>
        <TransferListCustomList title={`請選${type}編號`} items={left} />
      </Grid>

      <Grid className="transferList__button" item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={moveRight}
            disabled={intersection(checked, left).length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={moveLeft}
            disabled={intersection(checked, right).length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>

      <Grid className="transferList__item" item>
        <TransferListCustomList title={`已選${type}編號`} items={right} />
      </Grid>
    </Grid>
  );
}

export default AddInfomationsTransferList;
