var htmlparser = require('htmlparser2');
var _ = require('lodash');
var dots = require("dot").process({path: "../templates/default"});


var html = "<h1>h1. This is a very large header.</h1>\
          <h2>h2. This is a large header.</h2>\
          <h2>Paragraphs are nice</h2>\
          <p>\
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\
          </p>\
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\
          <h2>Un-ordered lists are great for making quick outlines bulleted.</h2>\
          <ul>\
            <li>List item with a much longer description or more content.</li>\
            <li>List item</li>\
            <li>List item\
              <ul>\
                <li>Nested List Item</li>\
                <li>Nested List Item</li>\
                <li>Nested List Item</li>\
              </ul>\
            </li>\
            <li>List item</li>\
            <li>List item</li>\
            <li>List item</li>\
          </ul>\
          <h3>Ordered lists are great for lists that need order, duh.</h3>\
          <ol>\
            <li>List Item 1</li>\
            <li>List Item 2</li>\
            <li>List Item 3</li>\
          </ol>";

var config = {
  allowedTags: ['h1', 'h2', 'p', 'br', 'b', 'u', 'i', 'li', 'ol', 'ul']
}


function domToLatex(element){
  if (element.type === 'text') {
    return element.data;
  }

  if (element.type === 'tag') {
    if (!_.includes(config.allowedTags, element.name)) {
      return '';
    };
    var text = '';
    for (var i = 0; i < element.children.length; i++) {
      text += domToLatex(element.children[i]);
    };
    return dots[element.name]({"content": text});
  }
}


var handler = new htmlparser.DomHandler(function (error, dom) {
    if (error) {
        // [...do something for errors...]
    } else {
        for (var i = 0; i < dom.length; i++) {
          console.log(domToLatex(dom[i]));
        };
    }
});
var parser = new htmlparser.Parser(handler);
parser.write(html);
parser.done();