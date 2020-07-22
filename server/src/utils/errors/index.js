class ApplicationError extends Error {
  constructor (message, status) {
    super();

    Error.captureStackTrace( this, this.constructor );

    this.name = this.constructor.name;

    this.message = message ||
        'Something went wrong. Please try again.';

    this.status = status || 500;

  }
}

class AuthorizationError extends ApplicationError {
  constructor (message) {
    super( message || 'The request requires user authentication.', 401 );
  }
}


class ForbiddenError extends ApplicationError {
  constructor (message) {
    super( message || 'The server understood the request, but is refusing to fulfill it.', 403 );
  }
}

class ResourceNotFoundError extends ApplicationError {
  constructor (resource = 'resource') {
    super( `Error 404: ${resource} not found.`, 404 );
  }
}

class AuthenticationTimeoutError extends ApplicationError {
  constructor (message) {
    super( message || 'Access token is missing or expired', 419 );
  }
}

class UserError extends Error{
  constructor (msg, status) {
    super(msg);
    this._status = status;
  }

  get status () {
    return this._status;
  }

}

class BadRequestError extends UserError{
  constructor (msg) {
    super(msg || 'Bad request', 400);
  }
}

class NotFoundError extends UserError{
  constructor (msg) {
    super(msg || 'Resource not found', 404);
  }
}

module.exports = {
  ApplicationError,
  UserError,
  BadRequestError,
  NotFoundError,
  AuthenticationTimeoutError,
  AuthorizationError,
  ForbiddenError,
  ResourceNotFoundError
};
