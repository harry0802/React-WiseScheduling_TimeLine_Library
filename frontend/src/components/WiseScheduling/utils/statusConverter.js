const STATUS_MAPPING = {
  // 新状态
  試模: "testing",
  異常: "error",
  調機: "tuning",
  待機: "waiting",

  // 兼容旧状态
  產品試模: "testing",
  機台停機: "error",
  上模與調機: "tuning",
  待機中: "waiting",
  製立單: "production",
};

export const convertTimeLineStatus = (timeLineStatus) => {
  return STATUS_MAPPING[timeLineStatus] || "waiting";
};
