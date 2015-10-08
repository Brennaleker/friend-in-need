var Schema = {
  users: {
    id: { type: 'increments', nullable: false, primary: true },
    email: { type: 'string', maxlength: 254, nullable: false, unique: true },
    user_name: { type: 'string', maxlength: 150, nullable: false, unique: true },
    first_name: { type: 'string', maxlength: 150, nullable: false },
    last_name: { type: 'string', maxlength: 150, nullable: false }
  },

  organizations: {
    id: { type: 'increments', nullable: false, primary: true },
    user_id: { type: 'integer', nullable: false, unsigned: true },
    organization_name: { type: 'string', maxlength: 150, nullable: false },
    blurb: { type: 'text', maxlength: 1000, nullable: false },
    population_served: { type: 'string', maxlength: 150, nullable: false  },
    shipping_address_1: { type: 'string', maxlength: 150, nullable: false  },
    shipping_address_2: { type: 'string', maxlength: 150, nullable: false },
    shipping_city: { type: 'string', maxlength: 150, nullable: false },
    shipping_state: { type: 'string', maxlength: 150, nullable: false  },
    shipping_postal_code: { type: 'string', maxlength: 150, nullable: false }
  },

  volunteers: {
    bio: { type: 'text', maxlength: 1000, nullable: false },
    approved: { type: 'string', maxlength: 25, nullable: false }
  },

  donors: {
    billing_address_1: { type: 'string', maxlength: 150, nullable: false  },
    billing_address_2: { type: 'string', maxlength: 150, nullable: false },
    billing_city: { type: 'string', maxlength: 150, nullable: false },
    billing_state: { type: 'string', maxlength: 150, nullable: false  },
    billing_postal_code: { type: 'string', maxlength: 150, nullable: false }
  }
};


module.exports = Schema;
