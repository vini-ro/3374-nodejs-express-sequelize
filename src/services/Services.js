const { where } = require('sequelize');
const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll();
  }

  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model]
      .scope(escopo)
      .findAll({ where: { ...where } });
  }

  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: { ...where } });
  }

  async pegaEContaRegistros(where) {
    return dataSource[this.model].findAndCountAll({ 
      where: { ...where },
      limit: 2,
      order: [['id', 'ASC']],
    });
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, where) {
    const listadeRegistrosAtualizados = dataSource[this.model].update(
      dadosAtualizados,
      {
        where: { ...where },
      }
    );
    if (listadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;
