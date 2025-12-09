import userService from "./user.service.js";
import { formatUpdated } from "../../helpers/date.helper.js";

class UserController {
  // GET profile page
  async getProfileInformation(req, res, next) {
    try {
      const id = req.user.id;
      const userData = await userService.getProfileInformation(id);

      res.render("pages/user/profile", {
        title: "User Profile",
        route: "User",
        user: userData,
        formatUpdated,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST update profile
  async updateProfileInformation(req, res, next) {
    try {
      const id = req.user.id;
      const updatedData = req.body;

      if (!updatedData.password) delete updatedData.password;

      await userService.updateProfileInformation(id, updatedData);

      res.redirect("/api/user/profile");
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
