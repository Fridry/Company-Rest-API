const Category = require("../models/Category");

class CategoryController {
  async index(req, res) {
    const categories = await Category.find();

    return res.status(200).json(categories);
  }

  async show(req, res) {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ error: "Category not found" });

    return res.status(200).json(category);
  }

  async store(req, res) {
    try {
      const category = await Category.create(req.body);

      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: "Creation fails", err });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);

      if (!category)
        return res.status(404).json({ error: "Category not found" });

      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json(updatedCategory);
    } catch (err) {
      return res.status(400).json({ error: "Update fails", err });
    }
  }

  async delete(req, res) {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return res.status(404).json({ error: "Category not found" });

    return res.status(200).json();
  }
}

module.exports = new CategoryController();
