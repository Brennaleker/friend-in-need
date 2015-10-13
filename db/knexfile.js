var knex = require('knex')({
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'Brenna',
      password : null,
      database : 'shelter_helper',
      charset  : 'utf8'
    },
    seeds: {
      directory: './db/seed.js'
    }
});

module.exports = knex;
