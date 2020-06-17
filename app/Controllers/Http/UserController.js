"use strict";

const User = use("App/Models/User");

class UserController {
  async create({ request }) {
    const data = request.only(["name", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async show({ params }) {
    try {
      let user = await User.findOrFail(params.id);
      await user.load("thumbnail");

      user.password = "";
      return user;
    } catch (error) {
      return "Usuario não encontrato";
    }
  }
}

module.exports = UserController;
