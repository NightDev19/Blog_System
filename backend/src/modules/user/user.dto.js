class UserDTO {
  static toProfile(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static toProfileList(users) {
    return users.map((user) => this.toProfile(user));
  }

  static sanitizeUpdate(data) {
    const allowed = {};
    if (data.username !== undefined) allowed.username = data.username;
    if (data.email !== undefined) allowed.email = data.email;
    if (data.password !== undefined) allowed.password = data.password;
    return allowed;
  }
}

export default UserDTO;
