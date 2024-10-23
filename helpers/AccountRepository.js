import AccountModel from "../schemas/Account.js";
import BaseRepository from "./BaseRepository.js";

class AccountRepository extends BaseRepository {
  constructor() {
    super(AccountModel);
  }
}

export default new AccountRepository();
