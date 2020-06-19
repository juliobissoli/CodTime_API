"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//User routers
Route.post("/users", "UserController.create");
Route.get("/users/:id", "UserController.show");
Route.get("/users", "UserController.index");

//Session routers
Route.post("/login", "SessionController.create");

//Projects routers
Route.resource("projects", "ProjectController").apiOnly().middleware("auth");

//Commits routers
Route.resource("commits", "CommitController").apiOnly().middleware("auth");

//Tasks routers
Route.resource("tasks", "TaskController").apiOnly().middleware("auth");

//Running routers
Route.resource("runnings", "RunningController").apiOnly().middleware("auth");
Route.put("running_start/:id", "RunningController.start").middleware("auth");
Route.put("running_stop/:id", "RunningController.stop").middleware("auth");
