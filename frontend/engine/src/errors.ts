export class StackTooSmallError extends Error {
  constructor(message: string) {
    super();

    this.name = "StackTooSmallError";
    this.message = message;
  }
}

export class StackTooBigError extends Error {
  constructor(message: string) {
    super();

    this.name = "StackTooBigError";
    this.message = message;
  }
}

export class InvalidInputError extends Error {
  constructor(message: string) {
    super();

    this.name = "InvalidInputError";
    this.message = message;
  }
}
