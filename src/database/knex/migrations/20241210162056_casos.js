exports.up = function (knex) {
  return knex.schema.createTable("casos", function (table) {
    table.increments("id").primary();
    table.string("cpf").notNullable();
    table.string("decisao").notNullable();
    table.string("protocolado").notNullable();
    table.string("spc").notNullable();
    table.string("boa").notNullable();
    table.string("serasa").notNullable();
    table.string("cenprot").notNullable();
    table.string("quod").notNullable();

    table.foreign("cpf").references("cpf").inTable("clientes").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("casos");
};
