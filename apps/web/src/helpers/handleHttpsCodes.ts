export function handleHttpsCodes(httpsCode: string) {
  switch (httpsCode) {
    case "401":
      throw new HttpError("Unauthorized", "401");
    case "403":
      throw new HttpError("Forbidden", "403");
    case "404":
      throw new HttpError("Not Found", "404");
    case "500":
      throw new HttpError("Internal Server Error", "500");
    default:
      return "Unknown Error";
  }
}

class HttpError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "HttpError";
    this.code = code;
  }
}
