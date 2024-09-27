import * as React from "react";
import styles from "./index.module.scss";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useLotStore } from "../../store/zustand/store";
import { useHandleLotChanges } from "./useHandleLotChanges";

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  if (props.isQualityControl) {
    return <StyledText ref={ref}>{props.value || 0}</StyledText>;
  }

  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        input: { inputMode: "none" },
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

  const {
    label,
    lotName,
    schema,
    isQualityControl = false,
    qualityInputValue,
    putawayId,
    pscheduleId,
  } = props;

  const { handleLotChange } = useHandleLotChanges();

  // Move getInputValue function definition before useState
  const getInputValue = (lotName, schema) => {
    if (lots?.length === 0 && !isQualityControl) return 0;
    if (isQualityControl) {
      if (qualityInputValue !== undefined && qualityInputValue !== null) {
        return qualityInputValue;
      } else {
        return 0;
      }
    }

    let split_lotName = lotName.split("-");

    split_lotName.pop();
    let lot = lots.filter((lot) => lot.lotName === split_lotName.join("-"));

    if (lot.length > 0) {
      const childrenLots = lot[0].children.filter(
        (child) => child.lotName === lotName
      );
      if (childrenLots.length > 0) {
        return childrenLots[0][schema] === null ? 0 : childrenLots[0][schema];
      }
    }
    return 0;
  };

  // Use React.useState to manage the input value
  const [inputValue, setInputValue] = React.useState(() =>
    getInputValue(lotName, schema)
  );

  return (
    <div className={styles.quantityInput}>
      <label>{label}</label>
      <NumberInput
        aria-label="Quantity Input"
        min={0}
        max={999}
        value={inputValue}
        isQualityControl={isQualityControl}
        onChange={(_, newValue) => {
          if (newValue < 0 || newValue === "" || newValue === undefined) {
            newValue = 0;
          }
          setInputValue(newValue);
          updateLotsByInspection(lotName, schema, newValue);
          handleLotChange(pscheduleId, putawayId);
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
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  color: #8F8F8F;
  background: #EDEDED;
  border: 1px solid #8F8F8F;
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);
  border-radius: 8px;
  margin: 0 8px;
  padding: 6px 6px;
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
  font-size: 1rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: #186C98;
  background: #186C98;
  color: #FFFFFF;
  width: 30px;
  height: 30px;
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

// 新增一個純文字的樣式組件
const StyledText = styled("span")(
  () => `
  font-size: 1.75rem;
  font-family: inherit;
  font-weight: 600;
  color: #8F8F8F;
  padding: 6px 6px;
  min-width: 2.5rem;
  text-align: center;
  display: inline-block;
`
);
