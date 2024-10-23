import HirerModel from "../schemas/Hirer.js";
import BaseRepository from "./BaseRepository.js";

class HirerRepository extends BaseRepository {
  constructor() {
    super(HirerModel);
  }
}

export default new HirerRepository();
