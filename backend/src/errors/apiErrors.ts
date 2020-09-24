import { ResponseError } from "./index";

export class LimitNegativeError extends ResponseError {
  constructor(message?: Parameters<ErrorConstructor>[0]) {
    message = message || "limit can not be negative";
    super(message);
  }
}

export class NextTokenNegativeError extends ResponseError {
  constructor(message?: Parameters<ErrorConstructor>[0]) {
    message = message || "nextToken can not be negative";
    super(message);
  }
}
