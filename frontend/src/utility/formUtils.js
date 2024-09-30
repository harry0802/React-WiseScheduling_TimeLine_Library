import dayjs from "dayjs";

export function formatInitialValues(values, fields) {
  if (!values) return {};
  return Object.entries(values).reduce((acc, [key, value]) => {
    const field = fields.find((f) => f.name === key);
    acc[key] = field?.type === "date" && value ? dayjs(value) : value;
    return acc;
  }, {});
}

export function formatSubmitValues(values) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key] = dayjs.isDayjs(value) ? value.format("YYYY-MM-DD") : value;
    return acc;
  }, {});
}
