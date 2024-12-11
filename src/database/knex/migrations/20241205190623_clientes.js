exports.up = function (knex) {
  return knex.schema.createTable('clientes', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('cpf').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string("telefone").notNullable();
    table.string("endereco").notNullable();
    table.string("bairro").notNullable();
    table.string("cep").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('clientes');
};
