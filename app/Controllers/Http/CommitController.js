"use strict";

const Commit = use("App/Models/Commit");
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

    const commit = await Commit.create(data);

    return commit;
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
  async show({ params, request, response, view }) {}

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
  async destroy({ params, request, response }) {}
}

module.exports = CommitController;
