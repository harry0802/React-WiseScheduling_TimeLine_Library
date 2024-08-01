import TextField from "@mui/material/TextField";

function ProductTextFieldInput({
  label = "設定中...",
  OnChange = null,
  value = "設定中...",
}) {
  return (
    <TextField
      className="c-textfield"
      value={value}
      label={label}
      onChange={OnChange}
    />
  );
}

export default ProductTextFieldInput;
