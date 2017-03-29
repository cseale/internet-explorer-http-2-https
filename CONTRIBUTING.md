# Building the Packages:
```
npm run build
```

# Running the Development Server:
To develop and test cross protocol api calls in IE, you will need 2 webpack dev servers running simultaneously
```bash
# http server, webpack will automatically choose 8080
npm run start
# in a new terminal, run the https server, webpack should choose 8081
npm run start:https
```

# Running the Tests:
```
npm test
```

# To Dos:
- [ ] Complete Unit Testing