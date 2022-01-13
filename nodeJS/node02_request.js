// załączamy moduł  http i moduł url - umozliwi sparsowanie adresu
var htttp = require("http");
var url = require("url");
// 
htttp.createServer(
  function (req, res) {
    res.writeHead(200, {
      'Content-type': 'text/html'
    }) // zwrócony contentType o wartości html
    res.write("req.url: " + req.url + "<br>");
    let parsedUrl = url.parse(req.url, true);

    res.write("parsedUrl.pathname: " + parsedUrl.pathname + "<br>");

    res.write("parsedUrl.query: " + JSON.stringify(parsedUrl.query) + "<br>");

    if (parsedUrl.query.arg2) res.write("parsedUrl.query.arg2: " + parsedUrl.query.arg2);

    res.end();
  }
  // nasłuchiwnie na porcie 8080
).listen(8080);