import { Button, Tooltip } from "antd";
import { memo } from "react";
import styled, { css } from "styled-components";

// 顏色變量
const colors = {
  textSecondary: "#8f8f8f",
  background: "#ebecf0",
  borderColor: "#e8e8e8",
  buttonPrimary: "#83bf45",
  buttonHover: "#6fc1ae",
  buttonActive: "#8bc1e3",
  confirmButtonBg: "#186c98",
  confirmButtonText: "#e1e7f5",
  dangerButtonBg: "#eb0004",
  dangerButtonHover: "#e8686a",
  dangerButtonActive: "#be090c",
};

const buttonBase = css`
  display: flex;
  place-content: center center;
  /* width: 2.1875rem; */
  /* height: 2.1875rem; */
  background: ${colors.buttonPrimary} !important;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.25));

  & > svg {
    align-self: center;
    width: 100%;
    height: 100%;
  }
`;

const hoverActiveStates = (hoverBg, activeBg) => css`
  &:hover {
    background-color: ${hoverBg} !important;
    color: white !important;
  }

  &:active {
    background-color: ${activeBg} !important;
    color: white !important;
  }
`;

const StyleBtn = styled(Button)`
  ${buttonBase}
  ${hoverActiveStates(colors.buttonHover, colors.buttonActive)}

  &.c-btn-primars--cancel {
    color: ${colors.textSecondary};
    background: unset;
    &:hover {
      color: ${colors.buttonHover};
      text-decoration: underline;
    }
    &:active {
      color: ${colors.buttonActive};
    }
  }

  &.c-btn-primars--delete {
    background-color: ${colors.dangerButtonBg} !important;
    color: #fff !important;
    ${hoverActiveStates(colors.dangerButtonHover, colors.dangerButtonActive)}
  }
`;

const BaseButton = ({
  children,
  shape = "circle",
  onClick = null,
  className = "",
  icon,
  disabled,
  tooltip = "",
  type = "primary",
}) => {
  const buttonClassName = `c-btn-primars ${
    type === "delete" ? "c-btn-primars--delete" : ""
  } ${type === "cancel" ? "c-btn-primars--cancel" : ""} ${className}`;

  return (
    <Tooltip title={tooltip}>
      <StyleBtn
        className={buttonClassName}
        onClick={onClick}
        shape={shape}
        icon={icon}
        disabled={disabled}
      >
        {children}
      </StyleBtn>
    </Tooltip>
  );
};

export default memo(BaseButton);
