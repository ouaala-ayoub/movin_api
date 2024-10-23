import BaseRepository from "./BaseRepository.js";
import JobModel from "../schemas/Job.js";

class JobRepository extends BaseRepository {
  constructor() {
    super(JobModel);
  }

  // Add any job-specific methods here
  // Override the findById method to populate the hirerId field
  async findById(id, select) {
    return await this.model
      .findById(id)
      .select(select ?? "")
      .populate("hirerId");
  }

  // Override the find method to populate the hirerId field
  async find(query, select, pageSize = 20) {
    const page = parseInt(query.page) - 1 || 0;
    const skip = page * pageSize;
    const { page: _, ...searchQuery } = query;

    return await this.model
      .find(searchQuery)
      .select(select ?? "")
      .populate("hirerId")
      .skip(skip)
      .limit(pageSize);
  }
}

export default new JobRepository();