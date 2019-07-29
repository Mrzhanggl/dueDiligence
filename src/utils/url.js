var protocol = window.location.protocol
console.log(protocol);

var hostUrl = protocol+'//' + window.location.host;
var inlineUrl = protocol+'//dd.falv58.com';
var testUrl = protocol+'//dd.falv58.com';

let webUrl = ""
let __PRO__ = true
if (hostUrl == inlineUrl) {
  webUrl = inlineUrl;
} else {
  __PRO__ = false
  webUrl = testUrl;
}

export {
    hostUrl,
    webUrl,
    __PRO__
}