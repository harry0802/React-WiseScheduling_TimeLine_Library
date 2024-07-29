import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

function ProductTextFieldSelect({
  label = "設定中...",
  OnChange = null,
  value = "設定中...",
  option = [],
}) {
  return (
    <div>
      <TextField select label={label} value={value} onChange={OnChange}>
        {option.length > 0 ??
          currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </div>
  );
}

export default ProductTextFieldSelect;
