var htmlparser = require('htmlparser2');
var domToLatex = require('domToLatex');


var handler = new htmlparser.DomHandler(function (error, dom) {
  if (!error) {
    latex = '':
    for (var i = 0; i < dom.length; i++) {
      latex += domToLatex(dom[i]);
    };
    return latex;
  }
});

var parser = new htmlparser.Parser(handler);

module.exports = parser;
