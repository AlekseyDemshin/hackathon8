# Run

```
npm i
npm start
```

# API
```
POST /plugins/:name
{
    "code": "js code goes here"
}
```

supported names:
- iframe
- icon-set

Result is written to the `server/output` folder as a plugin bundle

```
POST /plugins/:name/images
(form data)
```

Provided files are written to `server/output/img` folder
