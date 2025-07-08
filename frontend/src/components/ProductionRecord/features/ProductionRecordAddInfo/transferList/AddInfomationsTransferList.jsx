import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TransferListCustomList from "./TransferListCustomList.jsx";
import { useTransferListSlice } from "../../../slice/TransferListSlice.jsx";
import { TransferListContainer } from "./AddInfomationsTransferList.styled";
/*
AddInfomationsTransferList
│
├─ useTransferListSlice (Custom Hook)
│  │─ left []
│  │─ right []
│  │─ checked []
│  │─ moveRight()
│  │─ moveLeft()
│  └─ intersection()
│
└─ Render
   │
   ├─ Left List (Grid item)
   │  └─ TransferListCustomList
   │     │─ Title: "Please select {type} number"
   │     │─ Item list
   │     └─ Selection state
   │
   ├─ Middle Buttons (Grid item)
   │  ├─ Move right button (>)
   │  └─ Move left button (<)
   │
   └─ Right List (Grid item)
      └─ TransferListCustomList
         │─ Title: "Selected {type} number"
         │─ Item list
         └─ Selection state

Props:
- type: string (default: "attribute")
*/
function AddInfomationsTransferList({ type = "屬性" }) {
  const { left, right, checked, moveRight, moveLeft, intersection } =
    useTransferListSlice();

  return (
    <TransferListContainer
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={5}>
        <TransferListCustomList title={`請選${type}編號`} items={left} />
      </Grid>

      <Grid item xs={2}>
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

      <Grid item xs={5}>
        <TransferListCustomList title={`已選${type}編號`} items={right} />
      </Grid>
    </TransferListContainer>
  );
}

export default AddInfomationsTransferList;
