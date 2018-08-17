const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

app.post('/api/v1/projects', async (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['title']) {
    if (!project[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: {title: <string>}. You're missing a "${requiredParameter}" property.`
      });
    }

    try {
      const response = await database('projects').insert(project, 'id');
      const result = await response.status(201).json({ id: project[0] });
      return result
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
})

app.post('/api/v1/palettes', async (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['title', 'color_one', 'color_two', 'color_three', 'color_four', 'color_five']) {
    if (!palette[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: {title: <string>, color_one: <string>, color_two: <string>, color_three: <string>, color_four: <string>, color_five: <string>}. You're missing a "${requiredParameter}" property.`
      });
    }

    try {
      const response = await database('palette').insert(palette, 'id');
      const data = await response.status(201).json({ id: palette[0] });
      return data;
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
})

app.get('/api/v1/project/:projectName', async (request, response) => {

  try {
    const response = await database('projects')
      .where('title', request.params.projectName).select();
    const result = await response.status(201).json(projects);
    return result
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.get('/api/v1/palette', (request, response) => {

  try {
    const response = await database('palette').select();
    const data = await response.status(201).json(palette);
    return data;
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.listen(app.get('port'), () => {
  console.log(`you are listening on port ${app.get('port')}`)
})
