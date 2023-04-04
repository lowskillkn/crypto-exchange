export const roundBigNumber = (inputString, decimalPlaces) => {
  const number = parseFloat(inputString)
  const multiplied = number * Math.pow(10, decimalPlaces)
  const rounded = Math.round(multiplied)
  const hexValue = rounded.toString(16)
  return `0x${hexValue}`
}

export const stringToInt = (inputString, decimalPlaces) => {
  const number = parseFloat(inputString)
  const multiplied = number * Math.pow(10, decimalPlaces)
  const rounded = Math.round(multiplied)
  return rounded
}
