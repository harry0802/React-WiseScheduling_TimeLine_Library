import { StyledTextField } from "./ProductTextFieldInput.styled";

function ProductTextFieldInput({
  label = "設定中...",
  OnChange = null,
  value = "設定中...",
}) {
  return (
    <StyledTextField
      value={value}
      label={label}
      onChange={OnChange}
    />
  );
}

export default ProductTextFieldInput;
