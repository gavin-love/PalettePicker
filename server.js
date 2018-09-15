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

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['title']) {
    if (!project[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: {title: <string>}. You're missing a "${requiredParameter}" property.`
      });
    }

    database('projects').insert(project, 'id')
      .then(project => {
        return response.status(201).json({ id: project[0] })
      })
      .catch(error => {
        return response.status(500).json({ error })
      })
  }
})

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['color_one']) {
    if (!palette[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: {title: <string>, color_one: <string>, color_two: <string>, color_three: <string>, color_four: <string>, color_five: <string>}. You're missing a "${requiredParameter}" property.`
      });
    }

    database('palette').insert(palette, 'id')
      .then(palette => {
        return response.status(201).json({ id: palette[0] })
      })
      .catch(error => {
        return response.status(500).json({ error })
      })
  }
})

app.get('/api/v1/projects/:projectName', (request, response) => {
  database('projects').where('title', request.params.projectName).select()
    .then(projects => {
      return response.status(200).json(projects);
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
      return response.status(200).json(projects);
    })
    .catch(error => {
      return response.status(500).json({ error });
    })
})

app.get('/api/v1/palettes', (request, response) => {
  database('palette').select()
    .then(projects => {
      return response.status(200).json(projects);
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.delete('/api/v1/palettes/:id', (req, resp) => {
  const id = req.params.id;

  database('palette').where('project_id', id).select().del()
    .then(item => {
      if (item) {
        return resp.status(200).json('Item was deleted');
      } else {
        return resp.status(404).json('Item you are looking for does not exist in the database');
      };
    })
    .catch(error => {
      return resp.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`you are listening on port ${app.get('port')}`)
});

module.exports = app;
