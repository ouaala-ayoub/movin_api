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

  async find(query, select) {
    return await this.model.find(query).select(select ?? "");
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
