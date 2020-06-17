"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectsSchema extends Schema {
  up() {
    this.create("projects", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 100).notNullable();
      table.string("type", 80);
      table.decimal("totla_minuts");
      table.string("status", 80);

      table.timestamps();
    });
  }

  down() {
    this.drop("projects");
  }
}

module.exports = ProjectsSchema;
