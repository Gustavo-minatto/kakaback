const knex = require("../database/knex");

class ClientesController {
  async create(request, response) {
    const { name, cpf, email, telefone, endereco, bairro, cep } = request.body;

    try {
      const clienteExistente = await knex("clientes")
        .where("cpf", cpf)
        .orWhere("email", email)
        .first();

      if (clienteExistente) {
        return response.status(400).json({ error: "Cliente já cadastrado com este CPF ou Email." });
      }

      const [id] = await knex("clientes").insert({
        name,
        cpf,
        email,
        telefone,
        endereco,
        bairro,
        cep
      });

      return response.status(201).json({ id, message: "Cliente cadastrado com sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao cadastrar cliente. Tente novamente mais tarde." });
    }
  }

  async index(request, response) {
    try {
      const clientes = await knex("clientes").select("*");
      return response.status(200).json(clientes);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar clientes. Tente novamente mais tarde." });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, cpf, email, telefone, endereco, bairro, cep } = request.body;

    try {
      // Verifica se o cliente existe
      const cliente = await knex("clientes").where({ id }).first();
      if (!cliente) {
        return response.status(404).json({ error: "Cliente não encontrado!" });
      }

      // Verifica se já existe outro cliente com o mesmo CPF ou Email
      const clienteExistente = await knex("clientes")
        .where((builder) => {
          builder.where("cpf", cpf).orWhere("email", email);
        })
        .andWhereNot("id", id)
        .first();

      if (clienteExistente) {
        return response.status(400).json({
          error: "Já existe um cliente com o mesmo CPF ou Email.",
        });
      }

      // Atualiza os dados
      await knex("clientes")
        .update({ name, cpf, email, telefone, endereco, bairro, cep })
        .where({ id });

      return response.status(200).json({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      return response.status(500).json({ error: "Erro ao atualizar cliente. Tente novamente mais tarde." });
    }
  }


  async delete(request, response) {
    const { id } = request.params;

    try {
      const cliente = await knex("clientes").where({ id }).first();

      if (!cliente) {
        return response.status(404).json({ error: "Cliente não encontrado!" });
      }

      await knex("clientes").where({ id }).del();

      return response.status(200).json({ message: "Cliente excluído com sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao excluir cliente. Tente novamente mais tarde." });
    }
  }
}

module.exports = new ClientesController();
