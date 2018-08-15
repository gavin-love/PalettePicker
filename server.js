const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (request, response) => {

});

app.get('/json', (request, response) => {
  response.status(200).json();
});

app.listen(app.get('port'), () => {
  console.log(`you are listening on port ${app.get('port')}`)
})
