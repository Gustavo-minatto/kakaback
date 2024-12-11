const knex = require('../database/knex');
const { hash } = require('bcryptjs');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userExists = await knex('users').where({ email }).first();
    if (userExists) {
      return response.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const hashedPassword = await hash(password, 8);

    const [user] = await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    }).returning('*');

    return response.status(201).json(user);
  }
}

module.exports = new UsersController();
