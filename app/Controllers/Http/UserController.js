"use strict";

const User = use("App/Models/User");
const Running = use("App/Models/Running");

class UserController {
  async create({ request }) {
    const data = request.only(["name", "email", "password"]);

    const user = await User.create(data);
    if (user.id) {
      await Running.create({ user_id: user.id, minuts: 0 });
    }

    return user;
  }

  async show({ params }) {
    try {
      let user = await User.findOrFail(params.id);
      await user.load("thumbnail");
      await user.load("running");
      user.password = "";

      return user;
    } catch (error) {
      return "Usuario não encontrato";
    }
  }

  async index() {}
}

module.exports = UserController;
