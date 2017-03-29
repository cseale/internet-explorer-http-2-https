function ForbiddenError(message, code, param) {
  this.name = 'ForbiddenError';
  this.message = message;
  this.stack = (new Error()).stack;
  this.code = code || 403;
  this.param = param || null;
}
ForbiddenError.prototype = Object.create(Error.prototype);
export default ForbiddenError;
