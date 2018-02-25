var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000;

// Express Middleware
app.use(function(request, response, next) {
    // If over http, call next
    // if over https, redirect
    if(request.headers['x-forwarded-proto'] === 'https') {
        response.redirect('http://' + request.hostname + request.url);
    } else {
        next();
    }
});

app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('Express server is running on port ' + PORT);
});
