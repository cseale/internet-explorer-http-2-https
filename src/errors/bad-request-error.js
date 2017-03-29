function BadRequestError(message, code, param) {
  this.name = 'BadRequestError';
  this.message = message;
  this.stack = (new Error()).stack;
  this.code = code || 400;
  this.param = param || null;
}
BadRequestError.prototype = Object.create(Error.prototype);

export default BadRequestError;
