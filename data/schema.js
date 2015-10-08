var Schema = {
users: {
  id: {type: "increments", nullable: false, primary: true},
  username: {type: "string", maxlength: 150, nullable: false},
  password: {type: "string", nullable: false},
  email: {type: "string", maxlength: 254, nullable: false, unique: true},
  token: {type: "string", nullable: true}
},

volunteers: {
  id: {type: "increments", nullable: false, primary: true},
  user_id: {type: "integer", nullable: false, unsigned: true},
  bio: {type: "text", nullable: true},
  role: {type: "string", maxlength: 150, nullable: true},

},

donors: {
  id: {type: "increments", nullable: false, primary: true},
  user_id: {type: "integer", nullable: false, unsigned: true},
  billing_address_1: {type: "string", maxlength: 150, nullable: false, unsigned: true},
  billing_address_2: {type: "string", maxlength: 150, nullable: false},
  billing_city: {type: "string", maxlength: 150, nullable: false},
  billing_state: {type: "string", maxlength: 2, nullable: false},
  billing_postal_code: {type: "integer", maxlength: 5, nullable: false}
},

organizations: {
  id: {type: "increments", nullable: false, primary: true},
  user_id: {type: "integer", nullable: false, unsigned: true},
  name: {type: "string", maxlength: 150, nullable: false},
  phone: {type: "integer", maxlength: 10, nullable: false},
  blurb: {type: "text", nullable: true},
  shipping_address_1: {type: "string", maxlength: 150, nullable: false, unsigned: true},
  shipping_address_2: {type: "string", maxlength: 150, nullable: false},
  shipping_city: {type: "string", maxlength: 150, nullable: false},
  shipping_state: {type: "string", maxlength: 2, nullable: false},
  shipping_postal_code: {type: "integer", maxlength: 5, nullable: false}
}
};

module.exports = Schema;
