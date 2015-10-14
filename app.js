var knex = require('./db/knexfile.js'),
    Bookshelf = require('bookshelf')(knex),
    express = require('express'),
    app = express(),
    fs = require('fs'),
// var User = require("./models/user.js");
// var Users = require("./collections/users.js");
    //users = require('./controllers/users.js')
    Volunteer = require('./models/volunteer.js'),
    Volunteers = require('./collections/volunteers.js'),
    Donor = require('./models/donor.js'),
    Donors = require('./collections/donors.js'),
    Organization = require('./models/organization.js'),
    Organizations = require('./collections/organizations.js'),
    Item = require('./models/item.js'),
    Items = require('./collections/items.js'),
    Project = require('./models/project.js'),
    Projects = require('./collections/projects.js'),
    Gift = require('./models/gift.js'),
    Gifts = require('./collections/gifts.js'),
    bodyParser = require('body-parser'),
    _ = require('lodash'),

// application routing
    router = express.Router();

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// dynamically inclue controllers
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    var route = require('./controllers/' + file);
    route.controller(app);
  }
});

// // ---------------User API calls------------------------
// // fetch all Users
// router.route('/users')
// .get(function (req, res) {
//   Users.forge()
//   .fetch()
//   .then(function (collection) {
//     res.json({error: false, data: collection.toJSON()});
//   })
//   .otherwise(function (err) {
//     res.status(500).json({error: true, data: {message: err.message}});
//   });
// })
// // create a user
// .post(function (req, res) {
//   User.forge({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name
//   })
//   .save()
//   .then(function (user) {
//     res.json({error: false, data: {id: user.get('id')}});
//   })
//   .otherwise(function (err) {
//     res.status(500).json({error: true, data: {message: err.message}});
//   });
// });
//
// // fetch user
// router.route('/users/:id')
//   .get(function (req, res) {
//     User.forge({id: req.params.id})
//     .fetch()
//     .then(function (user) {
//       if (!user) {
//         res.status(404).json({error: true, data: {}});
//       }
//       else {
//         res.json({error: false, data: user.toJSON()});
//       }
//     })
//     .otherwise(function (err) {
//       res.status(500).json({error: true, data: {message: err.message}});
//     });
//   })
//   // update user details
//   .put(function (req, res) {
//     User.forge({id: req.params.id})
//     .fetch({require: true})
//     .then(function (user) {
//       user.save({
//         name: req.body.name || user.get('name'),
//         email: req.body.email || user.get('email'),
//         password: req.body.password || user.get('password'),
//         first_name: req.body.first_name || user.get('first_name'),
//         last_name: req.body.last_name || user.get('last_name')
//       })
//       .then(function () {
//         res.json({error: false, data: {message: 'User details updated'}});
//       })
//       .otherwise(function (err) {
//         res.status(500).json({error: true, data: {message: err.message}});
//       });
//     })
//     .otherwise(function (err) {
//       res.status(500).json({error: true, data: {message: err.message}});
//     });
//   })
//   // delete a user
//   .delete(function (req, res) {
//     User.forge({id: req.params.id})
//     .fetch({require: true})
//     .then(function (user) {
//       user.destroy()
//       .then(function () {
//         res.json({error: true, data: {message: 'User successfully deleted'}});
//       })
//       .otherwise(function (err) {
//         res.status(500).json({error: true, data: {message: err.message}});
//       });
//     })
//     .otherwise(function (err) {
//       res.status(500).json({error: true, data: {message: err.message}});
//     });
//   });

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
router.route('/volunteers')
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
router.route('/volunteers/:id')
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
        bio: req.body.bio || ('bio'),
        role: req.body.role || ('role'),
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

// ---------------Item API calls------------------------
// fetch all Items
router.route('/items')
.get(function (req, res) {
  Items.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})
// create an item
.post(function (req, res) {
  Item.forge({
    name:  req.body.name,
    description: req.body.description,
    url: req.body.url,
    price: req.body.price,
    quantity: req.body.quantity,
    total: req.body.total
  })
  .save()
  .then(function (item) {
    res.json({error: false, data: {id: item.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// fetch item
router.route('/items/:id')
  .get(function (req, res) {
    Item.forge({id: req.params.id})
    .fetch()
    .then(function (item) {
      if (!item) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: item.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update volunteer details
  .put(function (req, res) {
    Item.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (item) {
      item.save({
        name: req.body.name || ('name'),
        vendor: req.body.vendor || ('vendor'),
        description: req.body.description || ('description'),
        url: req.body.url || ('url'),
        price: req.body.price || ('price'),
        quantity: req.body.quantity || ('quantity'),
        total: req.body.total || ('total')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Item details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a item
  .delete(function (req, res) {
    Item.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (item) {
      item.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Item successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

// ---------------Project API calls------------------------
// fetch all Projects
router.route('/projects')
.get(function (req, res) {
  Projects.forge()
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
  Project.forge({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  })
  .save()
  .then(function (project) {
    res.json({error: false, data: {id: project.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// fetch project
router.route('/projects/:id')
  .get(function (req, res) {
    Project.forge({id: req.params.id})
    .fetch()
    .then(function (project) {
      if (!project) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: project.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update project details
  .put(function (req, res) {
    Project.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (project) {
      project.save({
        title: req.body.title || ('title'),
        description: req.body.description || ('description'),
        status: req.body.status || ('status')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Project details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a project
  .delete(function (req, res) {
    Project.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (project) {
      volunteer.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Project successfully deleted'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

// ---------------Gift API calls------------------------
// fetch all Gifts
router.route('/gifts')
.get(function (req, res) {
  Gifts.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})
// create a gift
.post(function (req, res) {
  Gift.forge({
    ammount: req.body.ammount,
    status: req.body.status,
    cc_name: req.body.cc_name,
    cc_exp: req.body.cc_exp,
    cc_number: req.body.cc_number,
    cc_ccv: req.body.cc_ccv,
    cc_address_1: req.body.cc_address_1,
    cc_address_2: req.body.cc_address_2,
    cc_city: req.body.city,
    cc_state: req.body.state,
    cc_postal_code: req.body.cc_postal_code
  })
  .save()
  .then(function (gift) {
    res.json({error: false, data: {id: gift.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// fetch gift
router.route('/gifts/:id')
  .get(function (req, res) {
    Gift.forge({id: req.params.id})
    .fetch()
    .then(function (gift) {
      if (!gift) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: gift.toJSON()});
      }
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update gift details
  .put(function (req, res) {
    Gift.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (gift) {
      gift.save({
        status: req.body.status || ('status'),
        ammount: req.body.ammount || ('ammount'),
        cc_name: req.body.cc_name || ('cc_name'),
        cc_number: req.body.cc_number || ('cc_number'),
        cc_exp: req.body.cc_exp || ('cc_exp'),
        cc_ccv: req.body.cc_ccv || ('cc_ccv'),
        cc_address_1: req.body.cc_address_1 || ('cc_address_1'),
        cc_address_2: req.body.cc_address_2 || ('cc_address_2'),
        cc_city: req.body.cc_city || ('cc_city'),
        cc_state: req.body.cc_state || ('cc_state'),
        cc_postal_code: req.body.cc_postal_code || ('cc_postal_code')
      })
      .then(function () {
        res.json({error: false, data: {message: 'Gift details updated'}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a gift
  .delete(function (req, res) {
    Gift.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (gift) {
      gift.destroy()
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

app.use('/', router);

app.listen(3000, function() {
  console.log("✔ Express server listening on port %d in %s mode", 3000, app.get('env'));
});

module.exports = app;
