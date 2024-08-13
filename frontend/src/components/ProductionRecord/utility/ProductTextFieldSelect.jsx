import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function ProductTextFieldSelect({
  label = "設定中...",
  OnChange = null,
  value = "設定中...",
  option = [],
}) {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={OnChange}
      className="textField-select "
    >
      {option.length > 0 &&
        option.map((opt) => (
          <MenuItem
            className="textField-select__menuItem"
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </MenuItem>
        ))}
    </TextField>
  );
}

export default ProductTextFieldSelect;
