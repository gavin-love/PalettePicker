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

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of 'title') {
    if (!project[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: {title: <string>}. You're missing a "${requiredParameter}" property.`
      });
    }

    database('projects').insert(project, 'id')
      .then(project => response.status(200).json({ id: project[0] }))
      .catch(error => response.status(500).json({ error }))
  }
})

app.post('/api/v1/palette', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of 'title') {
    if (!palette[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: {title: <string>}. You're missing a "${requiredParameter}" property.`
      });
    }

    database('palette').insert(palette, 'id')
      .then(palette => response.status(200).json({ id: palette[0] }))
      .catch(error => response.status(500).json({ error }))
  }
})




app.get('/json', (request, response) => {
  response.status(200).json();
});

app.listen(app.get('port'), () => {
  console.log(`you are listening on port ${app.get('port')}`)
})
