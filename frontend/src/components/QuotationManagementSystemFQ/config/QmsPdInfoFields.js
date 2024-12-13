export const getProductFields = (customerOptions) => [
  {
    type: "input",
    name: "productNumber",
    label: "產品序號",
    rules: { required: "Name is required" },
    props: { placeholder: "請輸入產品序號" },
  },
  {
    type: "input",
    name: "productName",
    label: "產品名稱",
    rules: { required: "Name is required" },
    props: { placeholder: "請輸入產品名稱" },
  },
  {
    type: "autocomplete",
    name: "customerName",
    label: "客戶名稱",
    options: customerOptions,
    rules: { required: "Please select at least one customer" },
  },
];
