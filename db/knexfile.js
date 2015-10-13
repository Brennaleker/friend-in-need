var knexfile = require('knex')({
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'Brenna',
      password : null,
      database : 'shelter_helper',
      charset  : 'utf8'
    },
    seeds: {
      directory: './seed.js'
    }
});

module.exports = knexfile;
