"use strict";
const Database = use("Database");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Commit extends Model {
  project() {
    return this.belongsTo("App/Models/Projetcs");
  }

  static scopeLastCommits(query, fristDate, lestDate) {
    if (fristDate && lestDate) {
      return query
        .whereBetween("time_end", [fristDate, lestDate])
        .orderBy("created_at", "desc");
    } else {
      return query;
    }
  }
  // task() {
  //   return this.hasOne("App/Models/Task");
  // }
}

module.exports = Commit;
