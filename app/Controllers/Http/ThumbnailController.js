"use strict";
const Helpers = use("Helpers");

const Image = use("App/Models/Thumbnail");

const User = use("App/Models/User");

class ThumbnailController {

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }


  async store({ params, request }) {
    const user = await User.findOrFail(params.id);

    const images = request.file("image", {
      types: ["image"],
      size: "2mb",
    });

    await images.moveAll(Helpers.tmpPath("uploads"), (file) => ({
      name: `${Date.now()}-${file.clientName}`,
    }));

    if (!images.movedAll()) {
      return images.errors();
    }

    await Promise.all(images
        .movedList()
        .map(image => user.thumbnail().create({
            path: image.fileName
        })))

  }
}

module.exports = ThumbnailController;
