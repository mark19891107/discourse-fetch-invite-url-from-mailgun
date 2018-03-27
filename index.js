const rp = require('request-promise');
const logList = require("./mailgun-list.json")
const key = require("./api-key.json").key
const auth = "Basic " + new Buffer("api:"+key).toString("base64");

logList.items.map(log => {
    options = {
        uri: log.content.storage.url,
        headers: {
            'Authorization': auth
        },
        json: true
    };

    rp(options)
        .then(json => {
            console.log(json.To + " " + json['stripped-text'].match(/http.*/)[0])
        })
})
