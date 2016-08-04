var connect = require('connect'),
serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname + '/static2'));
app.listen(8080);
console.log("listening 8080");