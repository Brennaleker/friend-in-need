#users table
  _id_: unique identifier, set to auto increment, integer
  _email_: account email, string
  _user_name_: unique user name, string
  _first_name_: user first name, string
  _last_name_: user last name, string

#organizations table
  _id_: unique identifier, set to auto increment, integer
  _user_id_: unique identifier, user account association, integer
  _organization_name_: name of shelter, string
  _blurb_: general information about shelter, text
  _population_served_: short description of population served, string,
  _shipping_address_1_: street address, string
  _shipping_address_2_: apt, suite, etc., string
  _shipping_city_: city, string,
  _shipping_state_: state, string,
  _shipping_postal_code_: zip code, integer
  _approval_status:_ approved, denied, pending, initiated at pending and updated by volunteers when information is vetted, string

#volunteers table
  _id_: unique identifier, set to auto increment, integer
  _user_id_: unique identifier, user account association, integer
  _bio_: information about the volunteer; why they are interested and how much time they can commit. text
  _approved_: whether or not the volunteer has been approved for volunteer access, string
  _role_: whether the volunteer is volunteering for a tech role or as a project reviewer, string

<!-- #donors
  _id_: { type: 'increments', nullable: false, primary: true },
  _user_id_: { type: 'integer', nullable: false, unsigned: true },
}, -->

#items table
  _id_: unique identifier, set to auto increment, integer
  _project_id_: unique identifier, project association, integer
  _name_: { type: 'string', maxlenght: 150, nullable: false },
  _description_: { type: 'text' },
  _url_: { type: 'string', maxlength: 250, nullable: false },
  _quantity_: { type: 'integer', nullable: false },
  _price_per_: { type: 'float', nullable: false },
  _total_: {type: 'float', nullable: false }
},

#gifts table
  _id_: unique identifier, set to auto increment, integer
  _project_id_: unique identifier, project association, integer
  _amount_: amount given, float
  _status_: payment pending, approved or denied, string
  _cc_name_: name on card, string
  _cc_exp_: credit card expiration date, integer
  _cc_ccv_: credit card security code, integer
  _cc_number_: credit card number, integer
  _cc_address_1_: billing street address, string
  _cc_address_2_: billing apt, suite, etc., string
  _cc_city_: billing city, string,
  _cc_state_: billing state, string,
  _cc_postal_code_: billing zip code, integer

#projects table
  _id_: unique identifier, set to auto increment, integer
  _organization_id_: unique identifier, organization account association, integer
  _title_: title of project, string
  _description_: description of project, text
  _approval_status_: whether the project has been vetted and approved by a volunteer, string
  _funding_status_: whether the project has been funded, string
  _shipping_status_: whether the project has been shipped or received, string
  _shipping_estimate_: total estimate of shipping costs, entered by volunteer, float
  _total_: total cost of project, float
  _essay_: who will the project serve, how will the items be used and what does a typical day look like at this shelter, text
  _proposal_picture_url_: a picture representing the project, string
  _funded_picture_url_: a picture of the products being used, string
  _thank_you_sent_: thank you notes sent out to donors, set by volunteers
