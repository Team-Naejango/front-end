export const getResponse = (message, result, success = true) => {
  return {
    message,
    result,
    success,
  }
}
