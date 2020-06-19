"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Project extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  running() {
    return this.belongsTo("App/Models/Running");
  }

  commits() {
    return this.hasMany("App/Models/Commit");
  }

  tasks() {
    return this.hasMany("App/Models/Task");
  }
}

module.exports = Project;
