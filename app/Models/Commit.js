"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Commit extends Model {
  project() {
    return this.belongsTo("App/Models/Projetcs");
  }
}

module.exports = Commit;
