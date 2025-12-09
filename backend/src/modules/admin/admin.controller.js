import adminServices from "./admin.services.js";

class AdminController {
  static async fetchAllUsers(_, res) {
    try {
      const users = await adminServices.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch users" });
    }
  }
  // admin.controller.js
  static async fetchAdminPosts(userId) {
    // Add userId parameter
    return await adminServices.getAdminPost(userId);
  }
}

export default AdminController;
