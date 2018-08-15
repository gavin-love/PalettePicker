exports.seed = function (knex, Promise) {
  return knex('palette').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          title: 'John/s APP'
        }, 'id')
          .then(project => {
            return knex('palette').insert([
              { title: 'sands', color_one: '#c2b280', color_two: '#c2b280', color_three: '#c2b280', color_four: '#c2b280', color_five: '#c2b280', project_id: project[0] },
              { title: 'sands', color_one: '#c2b280', color_two: '#c2b280', color_three: '#c2b280', color_four: '#c2b280', color_five: '#c2b280', project_id: project[0] }
            ], 'id')
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
};
