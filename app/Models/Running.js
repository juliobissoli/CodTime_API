"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Running extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  project() {
    return this.hasOne("App/Models/Project");
  }
}

module.exports = Running;
