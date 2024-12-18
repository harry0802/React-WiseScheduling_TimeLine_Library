export const INITIAL_PERCENTAGES = {
  marketingDiscount: 7,
  profit: 5,
  risk: 2,
  yearFactor: 2,
  feedback: 2,
};

export const FORM_FIELDS = [
  {
    type: "input",
    name: "quotationAmount",
    label: "實際報價",
    rules: { required: "報價金額是必填的" },
    props: {
      placeholder: "元",
      suffix: "元",
    },
  },
  {
    type: "input",
    name: "marketingDiscount",
    label: "管銷研百分比",
    rules: { required: "管銷研是必填的" },
    props: {
      placeholder: "7 %",
      suffix: "%",
    },
  },
  {
    type: "input",
    name: "profit",
    label: "利潤百分比",
    rules: { required: "利潤是必填的" },
    props: {
      placeholder: "5 %",
      suffix: "%",
    },
  },
  {
    type: "input",
    name: "risk",
    label: "風險百分比",
    rules: { required: "風險是必填的" },
    props: {
      placeholder: "2 %",
      suffix: "%",
    },
  },
  {
    type: "input",
    name: "yearFactor",
    label: "年降百分比",
    rules: { required: "年降是必填的" },
    props: {
      placeholder: "2 %",
      suffix: "%",
    },
  },
  {
    type: "input",
    name: "feedback",
    label: "回饋百分比",
    rules: { required: "回饋是必填的" },
    props: {
      placeholder: "2 %",
      suffix: "%",
    },
  },
];
