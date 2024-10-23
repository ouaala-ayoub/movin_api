import BaseRepository from "./BaseRepository.js";
import JobApplicationModel from "../schemas/JobApplication.js";

class JobApplicationRepository extends BaseRepository {
  constructor() {
    super(JobApplicationModel);
  }
}
export default new JobApplicationRepository();
