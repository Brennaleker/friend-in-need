\COPY users(id,email,username,first_name,last_name) from 'users.csv' WITH CSV;
\COPY donors(id,user_id) from 'donors.csv' WITH CSV;
\COPY volunteers(id,user_id,bio,approve,role) from 'volunteers.csv' WITH CSV;
\COPY organizations(id,user_id,organization_name,blurb,population_served,shipping_address_1,shipping_address_2,shipping_city,shipping_state,shipping_postal_code) from 'organizations.csv' WITH CSV;
\COPY items(id,project_id,name,url,quantity,price_per,total) from 'items.csv' WITH CSV;
\COPY projects(id,organization_id,) from 'users.csv' WITH CSV;
\COPY gifts(id,project_id,donor_id,ammount,status,cc_name,cc_exp,cc_ccv,cc_number,cc_address_1,cc_address_2,cc_city,cc_state,cc_postal_code) from 'users.csv' WITH CSV;
