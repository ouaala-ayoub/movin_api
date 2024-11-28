// baseRepository.js
export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id, select) {
    return await this.model.findById(id).select(select ?? "");
  }

  async find({ queries, select, populate }) {
    return await this.model
      .find(queries)
      .select(select ?? "")
      .populate(populate ?? "");
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
