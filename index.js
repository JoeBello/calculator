var express = require('express'),
    app = express(),
    path = require('path'),
    source = path.resolve(__dirname, 'src'),
    staticsource = express.static('src');

app.use(staticsource);

app.all('/*', function(req, res) {
  res.sendFile('index.html', {root: source});
});

app.listen(3000, function() {
  console.log('Listening on port 3000.');
})
