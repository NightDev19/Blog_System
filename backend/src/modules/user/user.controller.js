import userService from "./user.service.js";
import { formatUpdated } from "../../helpers/user.helper.js";
class UserController {
  async getProfileInformation(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getProfileInformation(id);
      res.render("pages/user/profile", {
        title: "User Profile",
        route: "User",
        user: user.rows[0],
        formatUpdated,
        
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
