import BadRequestError from '../errors/bad-request-error';
import ForbiddenError from '../errors/forbidden-error';
import ServerError from '../errors/server-error';
import UnauthorizedError from '../errors/unauthorized-error';

const GENERIC_SERVER_ERROR_MESSAGE = 'Woops, there was an error making the request.';

export function start() {
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
  let xhr;

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
        error: new ServerError(GENERIC_SERVER_ERROR_MESSAGE, 500)
      }, origin);
    };
  } else {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onReadyStateChange() {
      if (xhr.readyState !== 4) { return; }

      let message = {
        requestId: options.requestId,
        status: xhr.status
      };
      let res = {};

      if (xhr.status >= 400) {
        try {
          res = JSON.parse(xhr.responseText);
        } catch (err) {
          res.message = xhr.responseText;
        }

        if (xhr.status >= 500) {
          message.error = new ServerError(res.message, xhr.status);
        } else if (xhr.status === 401) {
          message.error = new UnauthorizedError(res.message, xhr.status);
        } else if (xhr.status === 403) {
          message.error = new ForbiddenError(res.message, xhr.status);
        } else {
          message.error = new BadRequestError(res.message, xhr.status, res.param);
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

