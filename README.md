# load-spreadsheets

A simple microlibrary to load a public google spreadsheet via javascript into an array of key/value-objects for each row.

Of course there are [plenty](https://github.com/jsoma/tabletop) [solutions](https://github.com/okfn/recline.backend.gdocs) out there for more complex functionality but this one is only *693b* without any dependencies.

It makes use of [Googles old (but not yet deprecated) Data API](https://developers.google.com/gdata/samples/spreadsheet_sample).

Spreadsheets must be set to "publish to the web" (open to anyone).

## usage

**loadSpreadsheet**(*key*, *sheetN*, *callback*)

- *key*: the unique id-part in the public url
- *sheetN*: 1-based index for sheet

```html
<script src="./load-spreadsheets.min.js" type="text/javascript" charset="utf-8"></script>
```

```javascript
loadSpreadsheet('1FjYCGAIrxM-dKOXgY46fCG5SHRvnpXZO3OvLMnBJi_c', 1, d => {
  console.log(d)
})
```

## development

`npm install babel-cli babel-preset-es2015 uglify-js`

`babel load-spreadsheets.js | uglifyjs -c -m --wrap loadSpreadsheet > load-spreadsheets.min.js`
