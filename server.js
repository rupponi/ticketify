const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello there'});
});

app.post('/api/test', (req, res) => {
    res.send('Hello poster');
});

app.listen(port, ()=> console.log(`Listening on port ${ port }`));