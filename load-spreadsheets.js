/*
 * load public google spreadsheets asynchrously into js object
 *
 * spreadsheet must "published to the web" in csv format.
 *
 * @param {string} key - google spreadsheets key
 * @param {string} sheet - identifier for sheet
 * @param {function} callback - callback that gets array of objects with key/value-pairs for each row
 *
 *
 * usage:
 *
 *  loadSpreadsheet('1FjYCGAIrxM-dKOXgY46fCG5SHRvnpXZO3OvLMnBJi_c', 1, d => {
 *    console.log(d)
 *  })
 *
 * */

// polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

const getWid = gid => {
  // https://stackoverflow.com/questions/11290337/how-to-convert-google-spreadsheets-worksheet-string-id-to-integer-index-gid
  const xorval = gid > 31578 ? 474 : 31578;
  const letter = gid > 31578 ? 'o' : '';
  return letter + parseInt((gid ^ xorval)).toString(36)
}

const getUrl = (key, wid) => `https://spreadsheets.google.com/feeds/list/${key}/${wid}/public/values?alt=json`

window.loadSpreadsheet = (key, sheet, callback) => {

  const req = new XMLHttpRequest()

  req.addEventListener('load', () => {
    const d = JSON.parse(req.responseText)

    // parse through ugly json, wtf??
    const data = d.feed.entry.map(e => {
      const _d = {}
      Object.keys(e).filter(k => k.startsWith('gsx')).map(k => {
        _d[k.split('$')[1]] = e[k]['$t']
      })
      return _d
    })

    callback(data)
  })

  const wid = getWid(sheet - 1)  // wtf, google?
  req.open('GET', getUrl(key, wid))
  req.send()
}
