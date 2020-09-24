export class ResponseError extends Error {
  status: number;

  constructor(message?: Parameters<ErrorConstructor>[0]) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);
    this.status = 500;
  }
}
