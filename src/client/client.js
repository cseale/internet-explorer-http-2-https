export class XDomainRequestClient {
  constructor() {
    this.contextByRequestId = {};
    this.iframe = null;
    this.iframeReady = false;

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

    this.iframe = createIframe('http://localhost:8080/proxy.html');
    this.iframeReady = new Promise(resolve => {
      this.iframe.onload = () => {
        console.log('iframeReady');
        resolve();
      };
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

export function create() {
  return new XDomainRequestClient();
}
