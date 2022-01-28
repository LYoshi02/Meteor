export class GenericError {
  constructor(public message: string, public status: number) {}
}

// For 401 errors
export class AuthenticationError {
  constructor(public message: string) {}
}

// For 422 errors
export class ValidationError {
  constructor(public message: string) {}
}

// For 404 errors
export class NotFoundError {
  constructor(public message: string) {}
}

export type ErrorTypes =
  | GenericError
  | AuthenticationError
  | ValidationError
  | NotFoundError;
