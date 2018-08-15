exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function (table) {
      table.increments('id').primary();
      table.string('title');
      table.timestamps(true, true);

    }),

    knex.schema.createTable('palette', function (table) {
      table.increments('id').primary();
      table.string('color_one');
      table.string('color_two');
      table.string('color_three');
      table.string('color_four');
      table.string('color_five');
      table.integer('paper_id').unsigned();
      table.foreign('paper_id').references('projects.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palette'),
    knex.schema.dropTable('projects')
  ])
};
