const isNumber = (num: string): boolean => !Number.isNaN(Number(num));

export default (primary: string, secondary: string): string => {
  if (isNumber(primary) && isNumber(secondary)) {
    const res = Number(primary) / Number(secondary);
    let digits = 4;
    let formatted = res.toFixed(digits);
    const isInteger = res === parseInt(String(res), 10);
    while (!isInteger && !formatted.slice(-digits).match(/[1-9]/)) {
      digits += 1;
      formatted = res.toFixed(digits);
    }
    return formatted;
  }
  return primary;
};
