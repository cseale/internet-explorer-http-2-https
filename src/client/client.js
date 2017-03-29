import Promise from 'promise-polyfill';

const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'content-type';

export class XDomainRequestClient {
  constructor(proxyLocation) {
    this.contextByRequestId = {};
    this.correlationId = 0;
    this.proxyLocation = proxyLocation;
    this.iframe = createIframe(this.proxyLocation);
    this.iframeReady = new Promise(resolve => {
      this.iframe.onload = () => {
        resolve();
      };
    });

    if (window.addEventListener) {
      window.addEventListener('message', evt => {
        let requestContext = this.contextByRequestId[evt.data.requestId];
        if (requestContext) {
          if (evt.data.error) {
            requestContext.reject.call(null, evt.data.error);
          } else {
            requestContext.resolve.call(null, evt.data.body);
          }
        }
      }, false);
    }
  }

  sendRequest(options) {
    return this.iframeReady.then(() => {
      const requestId = this.correlationId++;
      let message = {
        requestId: requestId,
        method: options.method || 'GET',
        url: buildUrl(options.location, options.path, options.qs)
      };

      if (options.body) {
        message.headers[CONTENT_TYPE] = APPLICATION_JSON;
        message.body = stringify(options.body);
      }

      return new Promise((resolve, reject) => {
        this.contextByRequestId[requestId] = {
          resolve: resolve,
          reject: reject
        };

        try {
          this.iframe.contentWindow.postMessage(message, this.proxyLocation);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}

function createIframe(url) {
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  iframe.sandbox = 'allow-same-origin allow-scripts';

  document.body.appendChild(iframe);

  return iframe;
}

function buildUrl(baseUrl, path, params) {
  var queryString = '';
  var pathWithQueryString = path || '';
  var value;

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      value = typeof (params[key]) === 'object' ? JSON.stringify(params[key]) : params[key];
      queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }
  }

  if (queryString.length > 0) {
    queryString = queryString.substring(0, queryString.length - 1); // chop off last '&'
    pathWithQueryString = pathWithQueryString + '?' + queryString;
  }

  return baseUrl + pathWithQueryString;
}

/**
 * Custom stringify function to objects.
 *
 * It converts dates to string using Date#toISOString instead of Date#toJSON to avoid
 * conflicts with jQuery JSON Plugin which overrides the native toJSON function returning
 * only the date without time.
 *
 * @api private
 */
function stringify(object) {
  var result = {};

  if (object && typeof object === 'object') {
    Object.keys(object).forEach(key => {
      if (isDate(object[key])) {
        result[key] = object[key].toISOString();
      } else {
        result[key] = object[key];
      }
    });
  }

  return JSON.stringify(result);
}

function isDate(object) {
  return Object.prototype.toString.call(object) === '[object Date]';
}

export function create(proxyLocation) {
  return new XDomainRequestClient(proxyLocation);
}
