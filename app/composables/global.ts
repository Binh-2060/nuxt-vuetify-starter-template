import numeral from "numeral";
export const UseGetFormatDatePicker = (date: any) => {
  if (date) {
    const datenow = new Date(date);
    const day = datenow.getDate();
    const month = datenow.getMonth() + 1;
    const year = datenow.getFullYear();
    return `${numeral(day).format("00")}/${numeral(month).format(
      "00"
    )}/${year}`;
  } else {
    return date;
  }
};
