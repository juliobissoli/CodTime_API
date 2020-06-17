"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RunningSchema extends Schema {
  up() {
    this.create("runnings", (table) => {
      table.increments();
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
      table.string("date_start", 30);
      table.integer("minuts");
      table.boolean("is_running").defaultTo(false);
    });
  }

  down() {
    this.drop("runnings");
  }
}

module.exports = RunningSchema;
