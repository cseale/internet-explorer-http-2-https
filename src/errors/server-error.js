function ServerError(message, code) {
  this.name = 'ServerError';
  this.message = message;
  this.stack = (new Error()).stack;
  this.code = code || 500;
}
ServerError.prototype = Object.create(Error.prototype);
export default ServerError;
