var config = {
  tags: {
    h1 : 'h1',
    h2 : 'h2',
    h3 : 'h2',
    h4 : 'h2',
    h5 : 'h2',
    p  : 'p',
    div: 'p',
    br : 'br',
    b  : 'b',
    u  : 'u',
    i  : 'i',
    ol : 'ol',
    ul : 'ul',
    li : 'li'
  },
  allowedStyles: {
    "text-align": ['h1','h2', 'p'],
  },
  styles: {
    "text-align": {
        center: 'align-center',
        left  : 'align-left',
        right : 'align-right'
    }
  }
}

module.exports = config;
