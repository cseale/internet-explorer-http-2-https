X-Domain-Object-Proxy
=============
Package for web applications which wish to support IE 8-9 and need Cross Domain Request Support, specifically from HTTP pages to HTTPS.

# Motivation:
The limitations of XDR functionality in IE 8 and 9 are described in this blog post: <http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx>. This library intends to provide the workaround for point 7. Please be aware of the other limitations and requirements on the server side around headers and response types as mentioned in the blog post, if you intend to support IE 8 and 9.

# Installation:
```
npm install --save x-domain-object-proxy
```

# Proxy:
You will need to be able to set up an HTTPS folder on your web server and serve a html page which loads the `XDomainObjectProxy.proxy.js` file and starts the proxy. A sample html file might look something like this:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>proxy</title>
  <script type="text/javascript" src="http://mydomain.com/scripts/XDomainObjectProxy.proxy.js"></script></head>
  <body>
    <script>XDomainObject.proxy.start();</script>
  </body>
</html>
```

We have a template `src/proxy/proxy.ejs` which you can incorpate into your webpack build, or use your own template

# Client:
You will then use the request helper as such:
```javascript
// Either ES6 Import 
import {create} from 'XDomainObjectProxy.client'
var client = create();

// Or as a global object from using <script> tags
var client = XDomainObjectProxy.client.create('https://localhost:8081/proxy.html');

/**
 * some other code ...
 */

var options = {
  location: 'https://api.nasa.gov/planetary',
  path: '/apod',
  qs: {
    'api_key': 'DEMO_KEY'
  }
}
client.sendRequest(options).then(function (data) {
  console.log('data returned', data);
}, function (err) {
  console.log('error', err);
});
```
