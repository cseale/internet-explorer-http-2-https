Internet Explorer HTTP 2 HTTPS
=============
Package to help older versions of IE make XDR requests from HTTP protocol pages to HTTPS.

# Motivation:
The original limitations are talked about in this blog post: <http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx>. This library intends to provide a workaround to point 7. 

The code is this package is based off of these articles & examples:
- <http://mcgivery.com/ie8-and-cors/>
- <https://github.com/andrewmcgivery/RequestHelper>
- <http://www.webdbg.com/test/xdm/httptohttps.asp>


# Code Example:
To make it work you need to be able to set up an HTTPS folder on your web server and serve the html page provided in this package as `proxy/gateway.html`

You will then use the request helper as such:

```
To Be Completed
```

# Installation:
```
npm install --save internet-explorer-http-2-https
```

# Tests:
```
npm test
```

# To Dos:
- [ ] Complete Testing
- [ ] Add POST functionality
- [ ] Remove dependency on JQuery