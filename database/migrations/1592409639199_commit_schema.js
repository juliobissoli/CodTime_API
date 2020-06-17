"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CommitSchema extends Schema {
  up() {
    this.create("commits", (table) => {
      table.increments();
      table.string("mensage", 200);
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("task", 200);
      table.integer("task_id");
      table.integer("minuts");
      table.string("time_start", 40);
      table.string("time_end", 40);
      table.timestamps();
    });
  }

  down() {
    this.drop("commits");
  }
}

module.exports = CommitSchema;
