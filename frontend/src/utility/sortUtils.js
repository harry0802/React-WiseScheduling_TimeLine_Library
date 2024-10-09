import dayjs from "dayjs";

export const sortDate = (a, b) => {
  return dayjs(a).unix() - dayjs(b).unix();
};

export const sortNumber = (a, b) => {
  return a - b;
};
