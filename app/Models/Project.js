"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Project extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  commits() {
    return this.hasMany("App/Models/Commit");
  }
}

module.exports = Project;