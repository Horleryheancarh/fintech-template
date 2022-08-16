/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { hashSync } = require('bcryptjs')

let password = hashSync('password', 16)
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  
  // Insert NEW entries
  await knex('users').insert([
    {fullName: 'John Doe', email: 'johndoe@gmail.com', phone: '23401234567', accountNumber: '6786786780', password, pin: '2345'},
    {fullName: 'Jane Doe', email: 'janedoe@gmail.com', phone: '23423456789', accountNumber: '0678678678', password, pin: '6789'}
  ]);
};
