import UserModel from "../schemas/User.js";
import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }
}

export default new UserRepository();
