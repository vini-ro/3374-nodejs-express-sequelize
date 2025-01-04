'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    static associate(models) {
      Matricula.belongsTo(models.Pessoa, {
        foreignKey: 'estudante_id',
        as: 'estudante'
      });
      Matricula.belongsTo(models.Curso, {
        foreignKey: 'curso_id',
        as: 'curso'
      });
    }
  }
  Matricula.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matricula',
    tableName: 'matriculas',
    paranoid: true,
  });
  return Matricula;
};