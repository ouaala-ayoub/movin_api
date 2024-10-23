import BaseRepository from "./BaseRepository.js";
import ContractModel from "../schemas/Contract.js";

class ContractRepository extends BaseRepository {
  constructor() {
    super(ContractModel);
  }
}

export default new ContractRepository();
