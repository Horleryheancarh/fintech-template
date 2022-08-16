/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
	return knex.schema.createTable('users', function(table) {
	  table.increments('id');
	  table.string('fullName').notNullable();
	  table.string('email').notNullable().unique();
	  table.string('phone').notNullable();
	  table.string('accountNumber').notNullable().unique();
	  table.string('password');
	  table.string('pin');
	  table.integer('balance').defaultTo(0);
	})
  };

  exports.down = function(knex) {
	return knex.schema.dropTable('users');
  };