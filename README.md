X-Domain-Object-Proxy
=============
Package for web applications which wish to support IE 8-9 and need Cross Domain Request Support, specifically from HTTP pages to HTTPS.

# Motivation:
The original limitations are talked about in this blog post: <http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx>. This library intends to provide a workaround to point 7. 

The code is this package is based off of these articles & examples:
- <http://mcgivery.com/ie8-and-cors/>
- <https://github.com/andrewmcgivery/RequestHelper>
- <http://www.webdbg.com/test/xdm/httptohttps.asp>

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
```
To Be Completed
```
