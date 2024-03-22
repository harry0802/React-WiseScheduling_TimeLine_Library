import * as React from "react";
import styles from "./ProductionInspection.module.scss";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useLotStore } from "../../store/zustand/store";

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="large" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="large" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput(props) {
  var lots = useLotStore((state) => state.lots);
  const updateLotsByInspection = useLotStore(
    (state) => state.updateLotsByInspection
  );
  const { label, lotName, schema } = props;
  return (
    <div className={styles.quantityInput}>
      <label>{label}</label>
      <NumberInput
        aria-label="Quantity Input"
        min={1}
        max={99}
        onChange={(event, newValue) => {
          console.log(`the new value is ${newValue}`);
          console.log("lotName: ", lotName);
          console.log("schema: ", schema);
          updateLotsByInspection(lotName, schema, newValue);
        }}
      />
    </div>
  );
}

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: #8F8F8F;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  () => `
  font-size: 1.5rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: #8F8F8F;
  background: #EDEDED;
  border: 1px solid #8F8F8F;
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 2.5rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  () => `
  font-size: 1.5rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: #186C98;
  background: #186C98;
  color: #FFFFFF;
  width: 45px;
  height: 45px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${blue[500]};
    border-color: ${blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
