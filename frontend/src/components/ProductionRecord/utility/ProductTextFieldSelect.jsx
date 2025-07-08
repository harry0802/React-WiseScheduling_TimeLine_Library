import { StyledSelectTextField, StyledMenuItem } from "./ProductTextFieldSelect.styled";

function ProductTextFieldSelect({
  label = "設定中...",
  OnChange = null,
  value = "設定中...",
  option = [],
}) {
  return (
    <StyledSelectTextField
      select
      label={label}
      value={value}
      onChange={OnChange}
    >
      {option.length > 0 &&
        option.map((opt) => (
          <StyledMenuItem
            key={opt.id}
            value={opt.category}
          >
            {opt.category}
          </StyledMenuItem>
        ))}
    </StyledSelectTextField>
  );
}

export default ProductTextFieldSelect;
