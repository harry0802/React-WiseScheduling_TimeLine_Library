export const convertTimeLineStatus = (timeLineStatus) => {
  switch (timeLineStatus) {
    case "製立單":
      return "production";
    case "待機中":
      return "waiting";
    case "上模與調機":
      return "tuning";
    case "產品試模":
      return "testing";
    case "機台停機":
      return "error";
    default:
      return "waiting";
  }
};
