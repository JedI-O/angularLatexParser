var htmlparser = require('htmlparser2');
var sanitizeHtml = require('sanitize-html');
var domutils = require('domutils');

var domToLatex = function (element) {
    if(!!element.children){
        console.log(domutils.getChildren(element));
    }
    console.log(element);
}

var defaultConfig = {
  allowedTags: [ 'h1', 'h2', 'p', 'b', 'i', 'u', 'br', 'ul', 'ol', 'li'],
  allowedAttributes: {
    h1: ['style'],
    h2: ['style'],
    p : ['style']
  }
};

var html = "<h1>h1. This is a very <b>large</b> header.</h1>";

html = sanitizeHtml(html, defaultConfig);

var handler = new htmlparser.DomHandler(function (error, dom) {
    if (error) {
        // [...do something for errors...]
    } else {
        // [...parsing done, do something...]
        domToLatex(dom[0]);
    }
});
var parser = new htmlparser.Parser(handler);
parser.write(html);
parser.done();
