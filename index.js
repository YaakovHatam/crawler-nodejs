const fetch = require('node-fetch');
const analyze = require('./analyze');

let baseUrl = 'habama.co.il';
let url = 'habama.co.il';
/**
 * ${url} in `xtz.co.il` format
 */
function crawl() {
    // TODO: IF http.co.il
    if (url.indexOf('http') != 0) {
        url = 'http://' + url;
    }
    fetch(url).then(res => {
        res.text().then(textRes => {
            console.log(textRes.toLowerCase());
            analyze(baseUrl, textRes.toLowerCase())
        })
    })
}
crawl(url);
