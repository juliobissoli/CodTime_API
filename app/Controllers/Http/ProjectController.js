"use strict";
const Project = use("App/Models/Project");
const Task = use("App/Models/Task");
const Commit = use("App/Models/Commit");
const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const data = request.only(["user_id", "fristDate", "lestDate"]);

    const projects = await Project.query()
      .where("user_id", data.user_id)
      .with("commits", (el) => {
        el.lastCommits(data.fristDate, data.lestDate);
      })
      .with("tasks")
      .fetch();

    return projects;
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["user_id", "name", "type"]);

    try {
      const project = await Project.create({
        ...data,
        status: "progres",
        totla_minuts: 0,
      });
      await Task.create({
        project_id: project.id,
        name: "Commit sem tarefa",
        minuts: 0,
      });
      return project;
    } catch (error) {
      return error;
    }
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const user_id = params.id;
    const data = request.only(["fristDate", "lestDate"]);
    // console.log(data);
    const projects = await Project.query()
      .where("user_id", user_id)
      .with("commits", (el) => {
        el.lastCommits(data.fristDate, data.lestDate);
      })
      .with("tasks")
      .fetch();

    return projects;
  }

  /**
   * Render a form to update an existing project.
   * GET projects/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ProjectController;
