# Run

```
npm i
npm start
```

# API

request:

POST /plugins/:name
```
{
    "code": "js code goes here"
}
```

supported names:
- iframe
- icon-set

Result is written to the `server/output` folder as a plugin bundle
