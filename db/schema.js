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
    id: { type: 'increments', nullable: false, primary: true },
    user_id: { type: 'integer', nullable: false, unsigned: true },
    bio: { type: 'text', maxlength: 1000, nullable: false },
    approved: { type: 'string', maxlength: 25, nullable: false },
    role: { type: 'text', maxlength: 150, nullable: false }
  },

  donors: {
    id: { type: 'increments', nullable: false, primary: true },
    user_id: { type: 'integer', nullable: false, unsigned: true },
    billing_address_1: { type: 'string', maxlength: 150, nullable: false  },
    billing_address_2: { type: 'string', maxlength: 150, nullable: false },
    billing_city: { type: 'string', maxlength: 150, nullable: false },
    billing_state: { type: 'string', maxlength: 150, nullable: false  },
    billing_postal_code: { type: 'string', maxlength: 150, nullable: false }
  },

  items: {
    id: { type: 'increments', nullable: false, primary: true },
    project_id: { type: 'integer', nullable: false, unsigned: true },
    name: { type: 'string', maxlenght: 150, nullable: false },
    description: { type: 'text' },
    url: { type: 'string', maxlength: 250, nullable: false },
    quantity: { type: 'integer', nullable: false },
    price_per: { type: 'integer', nullable: false },
    total: {type: 'integer', nullable: false }
  },

  gifts: {
    id: { type: 'increments', nullable: false, primary: true },
    project_id: { type: 'integer', nullable: false, unsigned: true },
    donor_id: { type: 'integer', nullable: false, unsigned: true },
    ammount: { type: 'integer', nullable: false },
    status: { type: 'string', maxlength: 100, nullabe: false },
    cc_name: { type: 'string', maxlenght: 150, nullable: false },
    cc_exp: { type: 'integer', nullable: false },
    cc_ccv: { type: 'integer', nullable: false },
    cc_number: { type: 'integer', maxlength: 16, nullable: false},
    cc_address_1: { type: 'string', maxlength: 150, nullable: false  },
    cc_address_2: { type: 'string', maxlength: 150, nullable: false },
    cc_city: { type: 'string', maxlength: 150, nullable: false },
    cc_state: { type: 'string', maxlength: 150, nullable: false  },
    cc_postal_code: { type: 'string', maxlength: 150, nullable: false }
  },

  projects: {
    id: { type: 'increments', nullable: false, primary: true },
    organization_id: { type: 'integer', nullable: false, unsigned: true },
    title: { type: 'string', maxlength: 250, nullable: false },
    decriptiong: { type: 'text', maxlength: 750, nullable: false },
    status: { type: 'string', nullable: false }
  }
};

module.exports = Schema;
