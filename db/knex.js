let options = {
	development: {
	  client: 'mysql',
	  connection: 'mysql://test_user:qwertyuiop@localhost:3306/fintech_db',
	  migrations: {
		directory: __dirname + '/db/migrations'
	  },
	  seeds: {
		directory: __dirname + '/db/seeds'
	  }
	},
	production: {
	  client: 'mysql',
	  connection: 'mysql://test_user:qwertyuiop@localhost:3306/fintech_db',
	  pool: {
		min: 2,
		max: 10
	  }
	}
  }
  
  let environment = process.env.NODE_ENV || 'development'
  let config = options[environment]
  module.exports = require('knex')(config)