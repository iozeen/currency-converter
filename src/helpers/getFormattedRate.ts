export default (res: number): string => {
  let digits = 4;
  let formatted = res.toFixed(digits);
  const isInteger = res === parseInt(String(res), 10);
  while (!isInteger && !formatted.slice(-digits).match(/[1-9]/)) {
    digits += 1;
    formatted = res.toFixed(digits);
  }
  return formatted;
};
