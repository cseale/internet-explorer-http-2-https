(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["proxy"] = factory();
	else
		root["XDomainObjectProxy"] = root["XDomainObjectProxy"] || {}, root["XDomainObjectProxy"]["proxy"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function BadRequestError(message, code, param) {
  this.name = 'BadRequestError';
  this.message = message;
  this.stack = new Error().stack;
  this.code = code || 400;
  this.param = param || null;
}
BadRequestError.prototype = Object.create(Error.prototype);

exports.default = BadRequestError;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function ForbiddenError(message, code, param) {
  this.name = 'ForbiddenError';
  this.message = message;
  this.stack = new Error().stack;
  this.code = code || 403;
  this.param = param || null;
}
ForbiddenError.prototype = Object.create(Error.prototype);
exports.default = ForbiddenError;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function ServerError(message, code) {
  this.name = 'ServerError';
  this.message = message;
  this.stack = new Error().stack;
  this.code = code || 500;
}
ServerError.prototype = Object.create(Error.prototype);
exports.default = ServerError;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function UnauthorizedError(message, code, param) {
  this.name = 'UnauthorizedError';
  this.message = message;
  this.stack = new Error().stack;
  this.code = code || 401;
  this.param = param || null;
}
UnauthorizedError.prototype = Object.create(Error.prototype);
exports.default = UnauthorizedError;

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _badRequestError = __webpack_require__(0);

var _badRequestError2 = _interopRequireDefault(_badRequestError);

var _forbiddenError = __webpack_require__(1);

var _forbiddenError2 = _interopRequireDefault(_forbiddenError);

var _serverError = __webpack_require__(2);

var _serverError2 = _interopRequireDefault(_serverError);

var _unauthorizedError = __webpack_require__(3);

var _unauthorizedError2 = _interopRequireDefault(_unauthorizedError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GENERIC_SERVER_ERROR_MESSAGE = 'Woops, there was an error making the request.';

function start() {
  if (window.addEventListener) {
    window.addEventListener('message', function (evt) {
      // making sure the message is an Altocloud's XHR request, and not any other message sent
      // on the window by other JS, including browser extensions.

      if (isRequest(evt.data)) {
        proxyXHR(evt.source, evt.origin, evt.data);
      }
    }, false);
  }
}

function isRequest(options) {
  return options && typeof options.url === 'string';
}

function proxyXHR(source, origin, options) {
  var xhr = void 0;

  if (window.XDomainRequest) {
    xhr = new XDomainRequest();

    xhr.onload = function () {
      // XDomainRequest won't return `status`, retuning 200 as default
      source.postMessage({
        requestId: options.requestId,
        body: tryParseAsJson(xhr.responseText),
        status: xhr.status || 200
      }, origin);
    };

    xhr.onerror = function () {
      // XDomainRequest doesn't give any details on the error, not much can be done here
      source.postMessage({
        requestId: options.requestId,
        error: new _serverError2.default(GENERIC_SERVER_ERROR_MESSAGE, 500)
      }, origin);
    };
  } else {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onReadyStateChange() {
      if (xhr.readyState !== 4) {
        return;
      }

      var message = {
        requestId: options.requestId,
        status: xhr.status
      };
      var res = {};

      if (xhr.status >= 400) {
        try {
          res = JSON.parse(xhr.responseText);
        } catch (err) {
          res.message = xhr.responseText;
        }

        if (xhr.status >= 500) {
          message.error = new _serverError2.default(res.message, xhr.status);
        } else if (xhr.status === 401) {
          message.error = new _unauthorizedError2.default(res.message, xhr.status);
        } else if (xhr.status === 403) {
          message.error = new _forbiddenError2.default(res.message, xhr.status);
        } else {
          message.error = new _badRequestError2.default(res.message, xhr.status, res.param);
        }
      } else {
        message.body = tryParseAsJson(xhr.responseText);
      }

      source.postMessage(message, origin);
    };
  }

  xhr.open(options.method, options.url);

  if (options.headers) {
    Object.keys(options.headers).forEach(function (headerName) {
      if (options.headers.hasOwnProperty(headerName)) {
        xhr.setRequestHeader(headerName, options.headers[headerName]);
      }
    });
  }

  xhr.send(options.body);

  function tryParseAsJson(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return str;
    }
  }
}

/***/ })
/******/ ]);
});