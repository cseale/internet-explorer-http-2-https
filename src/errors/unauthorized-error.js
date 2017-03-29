function UnauthorizedError(message, code, param) {
  this.name = 'UnauthorizedError';
  this.message = message;
  this.stack = (new Error()).stack;
  this.code = code || 401;
  this.param = param || null;
}
UnauthorizedError.prototype = Object.create(Error.prototype);
export default UnauthorizedError;
