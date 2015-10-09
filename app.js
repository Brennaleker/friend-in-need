var knex = require('knex')({
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        user     : 'Brenna',
        password : null,
        database : 'shelter_helper',
        charset  : 'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');

// application routing
var router = express.Router();

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ------------Models-----------------

// User model
var User = Bookshelf.Model.extend({
    tableName: 'users'
});
// Donor model
var Donor = Bookshelf.Model.extend({
    tableName: 'donors',
    user: function () {
        return this.belongsTo(User);
    }
});
// Organization model
var Organization = Bookshelf.Model.extend({
    tableName: 'categories',
    user: function () {
       return this.belongsTo(User);
    }
});
// Volunteer model
var Volunteer = Bookshelf.Model.extend({
    tableName: 'Volunteer',
    user: function () {
       return this.belongsTo(User);
    }
});

// collections
var Users = Bookshelf.Collection.extend({
  model: User
});
var Donors = Bookshelf.Collection.extend({
  model: Donor
});
var Organizations = Bookshelf.Collection.extend({
  model: Organization
});
var Volunteers = Bookshelf.Collection.extend({
  model: Volunteer
});

// ---------------User API calls------------------------
// fetch all Users
router.route('/users')
.get(function (req, res) {
  Users.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})
// create a user
.post(function (req, res) {
  User.forge({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  })
  .save()
  .then(function (user) {
    res.json({error: false, data: {id: user.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// fetch user
router.route('/users/:id')
  .get(function (req, res) {
    User.forge({id: req.params.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: user.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.save({
        name: req.body.name || user.get('name'),
        email: req.body.email || user.get('email'),
        password: req.body.password || user.get('password'),
        first_name: req.body.first_name || user.get('first_name'),
        last_name: req.body.last_name || user.get('last_name')
      })
      .then(function () {
        res.json({error: false, data: {message: 'User details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a user
  .delete(function (req, res) {
    User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'User successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

// ---------------Donor API calls------------------------
// fetch all Donors
router.route('/donors')
.get(function (req, res) {
  Donors.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})
// create a donor
.post(function (req, res) {
  Donor.forge({
    billing_address_1: req.body.billing_address_1,
    billing_address_2: req.body.billing_address_2,
    billing_city: req.body.billing_city,
    billing_state: req.body.billing_state,
    billing_postal_code: req.body.billing_postal_code
  })
  .save()
  .then(function (donor) {
    res.json({error: false, data: {id: donor.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// fetch donor
router.route('/donors/:id')
  .get(function (req, res) {
    Donor.forge({id: req.params.id})
    .fetch()
    .then(function (donor) {
      if (!donor) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: donor.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update donor details
  .put(function (req, res) {
    Donor.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (donor) {
      donor.save({
        billing_address_1: req.body.billing_address_1 || donor.get('billing_address_1'),
        billing_address_2: req.body.billing_address_2 || donor.get('billing_address_2'),
        billing_city: req.body.billing_city || ('billing_city'),
        billing_state: req.body.billing_state || ('billing_state')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Donor details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a donor
  .delete(function (req, res) {
    Donor.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (donor) {
      donor.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Donor successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

// ---------------Organization API calls------------------------
// fetch all Organizations
router.route('/organizations')
.get(function (req, res) {
  Organizations.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})
// create a donor
.post(function (req, res) {
  Organization.forge({
    billing_address_1: req.body.billing_address_1,
    billing_address_2: req.body.billing_address_2,
    billing_city: req.body.billing_city,
    billing_state: req.body.billing_state,
    billing_postal_code: req.body.billing_postal_code
  })
  .save()
  .then(function (organiztion) {
    res.json({error: false, data: {id: organization.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// fetch organization
router.route('/organizations/:id')
  .get(function (req, res) {
    Organization.forge({id: req.params.id})
    .fetch()
    .then(function (organization) {
      if (!organization) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: organization.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update organization details
  .put(function (req, res) {
    Organization.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (organization) {
      organization.save({
        organization_name: req.body.organization_name || organization.get('organization_name'),
        blurb: req.body.blurb || organization.get('blurb'),
        shipping_address_1: req.body.shipping_address_1 || ('shipping_address_1'),
        shipping_address_2: req.body.shipping_address_2 || ('billing_state'),
        shipping_city: req.body.shipping_city || ('shipping_city'),
        shipping_state: req.body.shipping_state || ('shipping_state'),
        shipping_postal_code: req.body.shipping_postal_code || ('shipping_postal_code'),
        population_served: req.body.population_served || ('population_served')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Organization details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete an organization
  .delete(function (req, res) {
    Organization.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (organization) {
      organization.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Organization successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // ---------------Volunteer API calls------------------------
  // fetch all Volunteers
  router.route('/donors')
  .get(function (req, res) {
    Volunteers.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a volunteer
  .post(function (req, res) {
    Volunteer.forge({
      role: req.body.role,
      approved: req.body.approved,
      bio: req.body.bio
    })
    .save()
    .then(function (volunteer) {
      res.json({error: false, data: {id: volunteer.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  // fetch volunteer
  router.route('/volutneers/:id')
    .get(function (req, res) {
      Volunteer.forge({id: req.params.id})
      .fetch()
      .then(function (volunteer) {
        if (!volunteer) {
          res.status(404).json({error: true, data: {}});
        }
        else {
          res.json({error: false, data: volunteer.toJSON()});
        }
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    // update volunteer details
    .put(function (req, res) {
      Volunteer.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (volunteer) {
        volunteer.save({
          bio: req.body.bio || volunteer.get('bio'),
          role: req.body.role || volunteer.get('role'),
          approve: req.body.approve || ('approve')
        })
        .then(function () {
          res.json({error: false, data: {message: 'Volunteer details updated'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    // delete a volunteer
    .delete(function (req, res) {
      Volunteer.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (volunteer) {
        volunteer.destroy()
        .then(function () {
          res.json({error: true, data: {message: 'Volunteer successfully deleted'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    });

app.use('/api', router);

app.listen(3000, function() {
  console.log("✔ Express server listening on port %d in %s mode", 3000, app.get('env'));
});

module.exports = app;
