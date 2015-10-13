exports.seed = function(knex, Promise) {
  return knex.table('users').insert([
      { id: 1, username: "Casper789", password: "password",
        email: "boo@email.com", first_name: "Casper",
        last_name: "Copperton"},
      { id: 2, username: "chicken12", password: "password",
        email: "chicken@email.com", first_name: "Bethany",
        last_name: "Bevel"
      },
      { id: 3, username: "red_baron", password: "password",
        email: "mikeh@email.com", first_name: "Mike",
        last_name: "Morton"
      }
  ]);
  return knex.table('donors').insert([
      { id: 1, username: "Casper789", password: "password",
        email: "boo@email.com", first_name: "Casper",
        last_name: "Copperton"},
      { id: 2, username: "chicken12", password: "password",
        email: "chicken@email.com", first_name: "Bethany",
        last_name: "Bevel"
      },
      { id: 3, username: "red_baron", password: "password",
        email: "mikeh@email.com", first_name: "Mike",
        last_name: "Morton"
      }
  ]);
  return knex.table('volunteers').insert([
      { id: 1, username: "Casper789", password: "password",
        email: "boo@email.com", first_name: "Casper",
        last_name: "Copperton"},
      { id: 2, username: "chicken12", password: "password",
        email: "chicken@email.com", first_name: "Bethany",
        last_name: "Bevel"
      },
      { id: 3, username: "red_baron", password: "password",
        email: "mikeh@email.com", first_name: "Mike",
        last_name: "Morton"
      }
  ]);
  return knex.table('organizations').insert([
      { id: 1, username: "Casper789", password: "password",
        email: "boo@email.com", first_name: "Casper",
        last_name: "Copperton"},
      { id: 2, username: "chicken12", password: "password",
        email: "chicken@email.com", first_name: "Bethany",
        last_name: "Bevel"
      },
      { id: 3, username: "red_baron", password: "password",
        email: "mikeh@email.com", first_name: "Mike",
        last_name: "Morton"
      }
  ]);
};
