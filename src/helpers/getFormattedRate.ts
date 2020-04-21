export default (res: number): string => {
  const result = Number.isNaN(res) ? Number(0) : res;
  let digits = 4;
  let formatted = result.toFixed(digits);
  const isInteger = result === parseInt(String(result), 10);
  while (!isInteger && !formatted.slice(-digits).match(/[1-9]/)) {
    digits += 1;
    formatted = result.toFixed(digits);
  }
  return formatted;
};
