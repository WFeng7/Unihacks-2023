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