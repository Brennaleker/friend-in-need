var request = require('supertest'),
    assert = require('assert'),
    app = require('../../app'),
    pg = require('pg'),
    agent = request.agent(app),
    Customer = require('../../customers'),
    customer_keys = ['id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit'],
    rental_keys = ['id', 'check_out', 'check_in', 'due_date', 'overdue', 'movie_title', 'customer_id'];
