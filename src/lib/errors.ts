// 400 Emailがない時のエラー
export class NoEmailError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

// 401
export class UnauthorizedError extends Error {
  status: number;

  constructor(message: string = "unauthorized", status = 401) {
    super(message);
    this.status = status;
  }
}

// 403
export class ForbiddenError extends Error {
  status: number;

  constructor(message: string = "forbidden", status = 403) {
    super(message);
    this.status = status;
  }
}

// 422
export class ValidationError extends Error {
  errors: { field: string; error: string }[] = [];
  status: number = 422;

  constructor(
    errors: { field: string; error: string }[] = [],
    message: string = "validation error",
    status = 422
  ) {
    super(message);
    this.errors = errors;
    this.status = status;
  }
}

// 500
export class ServerError extends Error {
  status: number = 500;

  constructor(message: string = "internal server error", status = 500) {
    super(message);
    this.status = status;
  }
}