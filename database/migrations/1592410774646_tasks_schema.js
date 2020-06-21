"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TasksSchema extends Schema {
  up() {
    this.create("tasks", (table) => {
      table.increments();
      table.string("name", 200);
      table.integer("minuts");
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("status", 20).defaultTo("produce");
      table.timestamps();
    });
  }

  down() {
    this.drop("tasks");
  }
}

module.exports = TasksSchema;
