var makeReq;
var attemptLogin;
(function() {
  const API_URL = 'https://unihacks2023.screwwcpss.repl.co';
  // const API_URL = 'http://localhost';
  // "SECURITY" TRUST
  let token = localStorage.getItem('token');
  makeReq = async function(path, body, contentType) {
    let data = await fetch(APIURL + path,
      {
        mode: 'cors',
        headers: {
          'Content-Type': contentType,
          Authorization: 'Bearer ' + token
        },
        body
      });
    if (data.status === 401) return void (window.location.href = './login.html');
    return data.text();
  };
  attemptLogin = async function(user, pass) {
    if (user.indexOf(':') >= 0) throw 'invalid character';
    let data = await fetch(API_URL + '/login', {
      mode: 'cors',
      headers: {
        Authorization: 'Basic ' + btoa(user + ':' + pass)
      }
    });
    if (data.status === 200) {
      token = await data.text();
      localStorage.setItem('token', token);
      window.location.href = './dashboard.html';
    } else throw "Invalid username/password combination";
  };
})();

var createElems = (function() {
  /*
  tags
  [
    'span',
    {
      tag: 'div',
      class: 'header'
    },
    [
      {
        tag: 'p',
        class: [ 'text', 'center' ]
      }
    ]
  ]
  <span></span>
  <div class="header">
    <p class="text center"></p>
  <div>
  */
  let prepareTags = function(tags) {
    return tags.map(v => {
      if (Array.isArray(v)) return prepareTags(v);
      if (typeof v === 'string' || v instanceof String) return { tag: v };
      return v;
    });
  };
  let create = function(tag, parent) {
    let elem = parent;
    if (Array.isArray(tag)) {
      tag.forEach(v => {
        elem = create(v, Array.isArray(v) ? elem : parent) || parent;
      });
      return (parent ? null : elem);
    }
    elem = document.createElement(tag.tag);
    if (tag.class) (Array.isArray(tag.class) ? tag.class : [tag.class]).forEach(v => elem.classList.add(v));
    if (tag.id) elem.id = tag.id;
    if (parent) parent.append(elem);
    return elem;
  };
  return function(tags) {
    if (!Array.isArray(tags)) tags = [tags];
    if (Array.isArray(tags[0])) tags.unshift('div');
    let parent = tags.shift();
    parent = create(parent);
    tags = prepareTags(tags, parent);
    create(tags, parent);
    return parent;
  };
}());