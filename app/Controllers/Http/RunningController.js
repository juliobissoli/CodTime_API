"use strict";
const Running = use("App/Models/Running");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with runnings
 */
class RunningController {
  /**
   * Show a list of all runnings.
   * GET runnings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await Running.all();
  }
  /**
   * Display a single running.
   * GET runnings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const run = await Running.findByOrFail("user_id", params.id);
      // await run.load("project");
      return run;
    } catch (error) {
      return error;
    }
  }

  /**
   * Render a form to update an existing running.
   * GET runnings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update({ params, request, response }) {
    const data = request.only([
      "date_start",
      "project_id",
      "is_running",
      "minuts",
    ]);

    const run = await Running.findOrFail(params.id);
    run.merge(data);
    await run.save(data);

    return run;
  }

  /**
   * Delete a running with id.
   * DELETE runnings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async start({ params, request }) {
    try {
      const data = request.only([
        "date_start",
        "minuts",
        "project_id",
        "is_running",
      ]);
      const run = await Running.findByOrFail("user_id", params.id);

      if (!run.is_running) {
        run.merge({
          date_start: data.date_start,
          minuts: data.minuts,
          project_id: data.project_id,
          is_running: true,
        });
        await run.save({
          date_start: data.date_start,
          minuts: data.minuts,
          project_id: data.project_id,
          is_running: true,
        });
        return run;
      } else {
        return "Já esta rodando";
      }
    } catch (error) {
      return error;
    }
  }

  async stop({ params, request }) {
    try {
      const run = await Running.findByOrFail("user_id", params.id);

      if (run.is_running) {
        run.merge({
          date_start: "",
          minuts: 0,
          project_id: null,
          is_running: false,
        });
        await run.save({
          date_start: "",
          minuts: 0,
          project_id: null,
          is_running: false,
        });
        return run;
      } else {
        return "Já esta parado";
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = RunningController;
