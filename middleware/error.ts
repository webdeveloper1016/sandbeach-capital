type StatusCodeType = 400 | 401 | 405 | 500;

const statusCode = (code?: StatusCodeType): string => {
  switch (code) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 405:
      return 'Method Not Allowed';
    case 500:
      return 'Server Error';
    default:
      return 'Server Error';
  }
};

export const errResp = (
  prod: boolean,
  error: Error | string,
  code?: StatusCodeType,
): string => {
  console.error(error)
  const respCode = statusCode(code);
  return prod ? respCode : JSON.stringify(error);
};
