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
    shipping_postal_code: { type: 'integer', maxlength: 5, nullable: false },
    approval_status: { type: 'string', nullable: false }
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
  },

  items: {
    id: { type: 'increments', nullable: false, primary: true },
    project_id: { type: 'integer', nullable: false, unsigned: true },
    name: { type: 'string', maxlenght: 150, nullable: false },
    description: { type: 'text' },
    url: { type: 'string', maxlength: 250, nullable: false },
    quantity: { type: 'integer', nullable: false },
    price_per: { type: 'float', nullable: false },
    total: {type: 'float', nullable: false }
  },

  gifts: {
    id: { type: 'increments', nullable: false, primary: true },
    project_id: { type: 'integer', nullable: false, unsigned: true },
    donor_id: { type: 'integer', nullable: false, unsigned: true },
    ammount: { type: 'float', nullable: false },
    status: { type: 'string', maxlength: 100, nullabe: false },
    cc_name: { type: 'string', maxlenght: 150, nullable: false },
    cc_exp: { type: 'integer', nullable: false },
    cc_ccv: { type: 'integer', nullable: false },
    cc_number: { type: 'integer', maxlength: 16, nullable: false},
    cc_address_1: { type: 'string', maxlength: 150, nullable: false  },
    cc_address_2: { type: 'string', maxlength: 150, nullable: false },
    cc_city: { type: 'string', maxlength: 150, nullable: false },
    cc_state: { type: 'string', maxlength: 150, nullable: false  },
    cc_postal_code: { type: 'integer', maxlength: 5, nullable: false }
  },

  projects: {
    id: { type: 'increments', nullable: false, primary: true },
    organization_id: { type: 'integer', nullable: false, unsigned: true },
    title: { type: 'string', maxlength: 250, nullable: false },
    description: { type: 'text', maxlength: 750, nullable: false },
    approval_status: { type: 'string', nullable: false },
    funding_status: { type: 'string', nullable: false },
    shipping_status: { type: 'string', nullable: false },
    total: { type: 'float' },
    essay: { type: 'string', maxlength: 400, nullable: false },
    proposal_picture_url: { type: 'string', nullable: false },
    funded_picture_url: { type: 'string' },
    thank_you_sent: { type: 'boolean', nullable: false }
  }
};

module.exports = Schema;
