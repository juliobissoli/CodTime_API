"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/users", "UserController.create");
Route.get("/users/:id", "UserController.show");
Route.post("/sessions", "SessionController.create");

Route.resource("projects", "ProjectController").apiOnly().middleware("auth");
Route.resource("commits", "CommitController").apiOnly().middleware("auth");
Route.resource("tasks", "TaskController").apiOnly().middleware("auth");
