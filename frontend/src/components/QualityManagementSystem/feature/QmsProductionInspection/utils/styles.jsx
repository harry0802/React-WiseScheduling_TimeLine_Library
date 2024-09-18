import { styled } from "@mui/system";
import { Box, Tabs, Button, TextField } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: "10px",
  padding: "20px",
}));

export const StyledTabContainer = styled("div")({
  flex: 1,
  backgroundColor: "transparent",
  borderBottom: "1px solid #8f8f8f",
});

export const StyledTabs = styled(Tabs)({
  "& .MuiButtonBase-root": {
    fontSize: "0.75rem",
    color: "#ffffff",
    "@media (min-width: 1024px)": {
      fontSize: "1rem",
    },
  },
  "& .Mui-selected": {
    color: "#8ac0e2",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  },
});

export const StyledButton = styled(Button)({
  textAlign: "end",
  marginTop: "30px",
  color: "#FFFFFF",
  fontSize: "16px",
});

export const StyledInspection = styled("div")({
  marginTop: "15px",
});

export const StyledHead = styled("div")({
  "& h1": {
    fontSize: "1.25rem",
    color: "#fff",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    "@media (min-width: 1024px)": {
      fontSize: "1.5rem",
    },
  },
});

export const StyledInner = styled("div")({
  fontSize: "1rem",
  display: "flex",
  marginTop: "15px",
  paddingLeft: "15px",
  color: "#ffffff",
  "@media (min-width: 1024px)": {
    fontSize: "1.5rem",
  },
});

export const StyledInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  width: "30%",
  "& span": {
    marginRight: "15px",
  },
});

export const StyledQty = styled("div")({
  display: "flex",
  alignItems: "center",
  "& span": {
    width: "25%",
  },
});

export const StyledRecords = styled("div")({
  maxWidth: "70%",
});

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    fontSize: "16px",
    color: "#FFF",
  },
  "& .MuiInputLabel-root": {
    fontSize: "16px",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "16px",
    color: "#E61F19",
  },
});
