const express = require('express')
const path = require('path')
const { get } = require('request')
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {

    res.sendFile("/index.html", { root: __dirname })

});
// app.get('/', (req, res) => res.redirect('/face_detection'))
// app.get('/face_detection', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.listen(3001, () => console.log('Listening on port 3000!'))
