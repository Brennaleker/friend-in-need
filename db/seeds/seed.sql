TRUNCATE TABLE users;
\COPY users(id,email,user_name,first_name,last_name,donor) from './db/seeds/users.csv' WITH CSV;
TRUNCATE TABLE volunteers;
\COPY volunteers(id,user_id,bio,approved,role) from './db/seeds/volunteers.csv' WITH CSV;
TRUNCATE TABLE organizations;
\COPY organizations(id,user_id,organization_name,blurb,population_served,shipping_address_1,shipping_address_2,shipping_city,shipping_state,shipping_postal_code,approval_status,karma) from './db/seeds/organizations.csv' WITH CSV;
TRUNCATE TABLE items;
\COPY items(id,project_id,name,url,description,quantity,price_per,total) from './db/seeds/items.csv' WITH CSV;
TRUNCATE TABLE projects;
\COPY projects(id,organization_id,title,description,approval_status,funding_status,shipping_status,total,essay,proposal_picture_url,funded_picture_url,thank_you_sent) from './db/seeds/projects.csv' WITH CSV;
TRUNCATE TABLE gifts;
\COPY gifts(id,project_id,donor_id,ammount,status,cc_name,cc_exp,cc_ccv,cc_number,cc_address_1,cc_address_2,cc_city,cc_state,cc_postal_code) from './db/seeds/gifts.csv' WITH CSV;
