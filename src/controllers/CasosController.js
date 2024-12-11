const knex = require("../database/knex");

class CasesController {
  async create(request, response) {
    const { cpf, decisao, protocolado, spc, boa, serasa, cenprot, quod } = request.body;

    try {
      const cliente = await knex("clientes").where({ cpf }).first();

      if (!cliente) {
        return response.status(404).json({ error: "Cliente não encontrado!" });
      }

      const [id] = await knex("casos").insert({
        cpf,
        decisao,
        protocolado,
        spc,
        boa,
        serasa,
        cenprot,
        quod,
      });

      return response.status(201).json({ id, message: "Caso cadastrado com sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao cadastrar caso. Tente novamente mais tarde." });
    }
  }

  async index(request, response) {
    try {
      const casos = await knex("casos").select("*");

      return response.status(200).json(casos);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar casos. Tente novamente mais tarde." });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { cpf, decisao, protocolado, spc, boa, serasa, cenprot, quod } = request.body;

    try {
      const caso = await knex("casos").where({ id }).first();

      if (!caso) {
        return response.status(404).json({ error: "Caso não encontrado!" });
      }

      await knex("casos")
        .update({ cpf, decisao, protocolado, spc, boa, serasa, cenprot, quod })
        .where({ id });

      return response.status(200).json({ message: "Caso atualizado com sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar caso. Tente novamente mais tarde." });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    try {
      const caso = await knex("casos").where({ id }).first();

      if (!caso) {
        return response.status(404).json({ error: "Caso não encontrado!" });
      }

      await knex("casos").where({ id }).del();

      return response.status(200).json({ message: "Caso excluído com sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao excluir caso. Tente novamente mais tarde." });
    }
  }
  async showByCpf(request, response) {
    const { cpf } = request.params;

    try {
      const casos = await knex("casos").where({ cpf }).select("*");

      if (casos.length === 0) {
        return response.status(404).json({ error: "Nenhum caso encontrado para este CPF." });
      }

      return response.status(200).json(casos);
    } catch (error) {
      console.error("Erro ao buscar casos por CPF:", error);
      return response.status(500).json({ error: "Erro ao buscar casos por CPF. Tente novamente mais tarde." });
    }
  }


}

module.exports = new CasesController();
