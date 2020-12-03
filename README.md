# Run

```
npm i
npm start
```

# API
```
POST /plugins/templates/:temaplateName
{
    "code": "js code goes here"
}
```

supported names:
- iframe
- icon-set

Result is written to the `server/output` folder as a plugin bundle

```
POST /plugins/templates/:templateName/images
(form data)
```

Provided files are written to `server/output/img` folder

```
GET /plugins
```

Get current `/server/output` folder contents as zip archive
