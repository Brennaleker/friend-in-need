var exec = require('child_process').exec;

function seeder() {
 // shell out to psql
 exec('psql shelter_helper < ./db/seeds/seed.sql', function(err, stdout, stderr) {
   console.log("Database seeded!");
   console.log(err, stdout, stderr);
 });
}

seeder();
