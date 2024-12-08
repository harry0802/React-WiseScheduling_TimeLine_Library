export const ProcessFormStyles = {
  tabs: {
    marginBottom: 3,
    width: "100%",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "99%",
      bottom: "1px",
      right: 0,
      borderBottom: "1px solid #8f8f8f",
    },
    "& .MuiTab-root": {
      margin: "0 4px",
      padding: "12px 16px",
      minHeight: "48px",
      transition: "all 0.2s ease",
      color: "#757575",
      fontSize: "18px",
      fontWeight: 400,
    },
    "& .Mui-selected": {
      fontSize: "19px",
      color: "#8bc1e3 !important",
      fontWeight: 500,
    },
    "& .MuiTabs-indicator": {
      height: "3px",
      backgroundColor: "#8bc1e3",
      transition: "all 0.3s ease",
    },
  },
};
