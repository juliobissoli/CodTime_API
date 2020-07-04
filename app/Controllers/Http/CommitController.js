"use strict";

const Commit = use("App/Models/Commit");
const Projets = use("App/Models/Project");
const Tasks = use("App/Models/Task");

const Database = use("Database");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with commits
 */
class CommitController {
  /**
   * Show a list of all commits.
   * GET commits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let commits = await Commit.all();
    return commits;
  }

  /**
   * Create/save a new commit.
   * POST commits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "mensage",
      "project_id",
      "minuts",
      "time_start",
      "time_end",
      "task",
      "task_id",
    ]);

    try {
      const commit = await Commit.create(data);

      //Update  in mitus in Project
      if (data.project_id) {
        const project = await Projets.findOrFail(data.project_id);

        let new_minuts = project.totla_minuts
          ? parseInt(project.totla_minuts, 10) + parseInt(data.minuts, 10)
          : parseInt(data.minuts, 10);

        project.merge({ totla_minuts: new_minuts });
        project.save({ totla_minuts: new_minuts });
      }

      if (data.task_id) {
        const task = await Tasks.findOrFail(data.task_id);

        let new_minuts_task = task.minuts
          ? parseInt(task.minuts, 10) + parseInt(data.minuts, 10)
          : parseInt(data.minuts, 10);

        task.merge({ minuts: new_minuts_task });
        task.save({ minuts: new_minuts_task });
      }

      return commit;
    } catch (error) {
      return error;
    }
  }

  /**
   * Display a single commit.
   * GET commits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const project_id = params.id;
    const data = request.only(["currentPage", "perPage"]);
    const commits = Database.from("commits")
      .where("project_id", project_id)
      .orderBy("created_at", "desc")
      .paginate(data.currentPage, data.perPage);

    return commits;
    // .with("attendances", (el) => {
    //   el.whereBetween('created_at', [fristDate, lestDate])
    //     .orderBy("created_at", "desc")
    // })
  }

  /**
   * Update commit details.
   * PUT or PATCH commits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a commit with id.
   * DELETE commits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const commit = await Commit.findOrFail(params.id);

      await commit.delete();

      return "commit deletado com sucesso";
    } catch (error) {
      return error;
    }
  }
}

module.exports = CommitController;
