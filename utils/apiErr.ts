export const apiErr = (prod: boolean, error: Error): string => {
  console.error(error);
  return prod
    ? 'Server Error'
    : JSON.stringify({
        status: 'Server Error',
        message: error.message,
      });
};
