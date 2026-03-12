import User from "../models/User.model.js";

class UserRepository {
  findByEmail(email) {
    return User.findOne({ email }).select("+password");
  }

  findByIdPopulated(id) {
    return User.findById(id).populate("clinicId", "name");
  }
}

export default new UserRepository();
