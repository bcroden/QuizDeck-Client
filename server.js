var express       = require('express');
var compression   = require('compression')

var app         = express();

app.set('port', (process.env.PORT || 8079));

app.use(compression());

app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/lib'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(app.get('port'), function() {
    console.log('App is running on port', app.get('port'));
});
