import InternetExplorerHttp2Https from './index';

let http2https;

beforeEach(() => {
  http2https = new InternetExplorerHttp2Https('myproxy');
});

test('constructor()', () => {
  expect(http2https.gateway).toBe('myproxy');
});

test('sendRequest()', () => {
  expect(http2https.sendRequest()).toBe('myproxy');
});