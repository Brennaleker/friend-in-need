#users table
  **id**: unique identifier, set to auto increment, integer  
  **email**: account email, string  
  **user_name**: unique user name, string  
  **first_name**: user first name, string  
  **last_name**: user last name, string

#organizations table
  **id**: unique identifier, set to auto increment, integer  
  **user_id**: unique identifier, user account association, integer  
  **organization_name**: name of shelter, string  
  **blurb**: general information about shelter, text  
  **population_served**: short description of population served, string  
  **shipping_address_1**: street address, string  
  **shipping_address_2**: apt, suite, etc., string  
  **shipping_city**: city, string,  
  **shipping_state**: state, string  
  **shipping_postal__code**: zip code, integer  
  **approval_status:** approved, denied, pending, initiated at pending and updated by volunteers when information is vetted, string

#volunteers table
  **id**: unique identifier, set to auto increment, integer  
  **user_id**: unique identifier, user account association, integer  
  **bio**: information about the volunteer; why they are interested and how much time they can commit. text  
  **approved**: whether or not the volunteer has been approved for volunteer access, string  
  **role**: whether the volunteer is volunteering for a tech role or as a project reviewer, string

<!-- #donors
  **id**: { type: 'increments', nullable: false, primary: true },
  **user**id**: { type: 'integer', nullable: false, unsigned: true },
}, -->

#items table
  **id**: unique identifier, set to auto increment, integer  
  **project_id**: unique identifier, project association, integer  
  **name**: name of item, string  
  **description**: description of item, text  
  **url**: link to item, string  
  **quantity**: quantity requested, integer
  **price_per**: price per item, float  
  **total**: total cost of item, float

#gifts table
  **id**: unique identifier, set to auto increment, integer  
  **project_id**: unique identifier, project association, integer  
  **amount**: amount given, float  
  **status**: payment pending, approved or denied, string  
  **cc_name**: name on card, string  
  **cc_exp**: credit card expiration date, integer  
  **cc_ccv**: credit card security code, integer  
  **cc_number**: credit card number, integer  
  **cc_address_1**: billing street address, string  
  **cc_address_2**: billing apt, suite, etc., string  
  **cc_city**: billing city, string  
  **cc_state**: billing state, string  
  **cc_postal_code**: billing zip code, integer

#projects table
  **id**: unique identifier, set to auto increment, integer  
  **organization_id**: unique identifier, organization account association, integer  
  **title**: title of project, string  
  **description**: description of project, text  
  **approval_status**: whether the project has been vetted and approved by a volunteer, string  
  **funding_status**: whether the project has been funded, string  
  **shipping_status**: whether the project has been shipped or received, string  
  **shipping_estimate**: total estimate of shipping costs, entered by volunteer, float  
  **total**: total cost of project, float  
  **essay**: who will the project serve, how will the items be used and what does a typical day look like at this shelter, text  
  **proposal_picture_url**: a picture representing the project, string  
  **funded_picture_url**: a picture of the products being used, string  
  **thank_you_sent**: thank you notes sent out to donors, set by volunteers
