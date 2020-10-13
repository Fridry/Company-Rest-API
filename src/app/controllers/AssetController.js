const Asset = require("../models/Asset");
const User = require("../models/User");
const Unit = require("../models/Unit");
const Category = require("../models/Category");

class AssetController {
  async index(req, res) {
    const assets = await Asset.find()
      .populate({ path: "unit", select: ["name"] })
      .populate({ path: "responsible", select: ["name"] })
      .populate({ path: "category", select: ["name", "description"] });

    return res.status(200).json(assets);
  }

  async show(req, res) {
    const asset = await Asset.findById(req.params.id)
      .populate({ path: "unit", select: ["name"] })
      .populate({ path: "responsible", select: ["name"] })
      .populate({ path: "category", select: ["name", "description"] });

    if (!asset) return res.status(404).json({ error: "Asset not found" });

    return res.status(200).json(asset);
  }

  async store(req, res) {
    const { responsible, unit, category } = req.body;

    try {
      const userExists = await User.findById({ _id: responsible });

      if (!userExists) return res.status(404).json({ error: "User not found" });

      const unitExists = await Unit.findById({ _id: unit });

      if (!unitExists) return res.status(404).json({ error: "Unit not found" });

      const CategoryExists = await Category.findById({ _id: category });

      if (!CategoryExists)
        return res.status(404).json({ error: "Category not found" });

      const asset = await Asset.create(req.body);

      return res.status(201).json(asset);
    } catch (err) {
      return res.status(400).json({ error: "Creation fails", err });
    }
  }

  async update(req, res) {
    const { responsible, unit, category } = req.body;

    try {
      const asset = await Asset.findById(req.params.id);

      if (!asset) return res.status(404).json({ error: "Asset not found" });

      const userExists = await User.findById({ _id: responsible });

      if (!userExists) return res.status(404).json({ error: "User not found" });

      const unitExists = await Unit.findById({ _id: unit });

      if (!unitExists) return res.status(404).json({ error: "Unit not found" });

      const CategoryExists = await Category.findById({ _id: category });

      if (!CategoryExists)
        return res.status(404).json({ error: "Category not found" });

      const updatedAsset = await Asset.findOneAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json(updatedAsset);
    } catch (err) {
      return res.status(400).json({ error: "Update fails", err });
    }
  }

  async delete(req, res) {
    const asset = await Asset.findByIdAndDelete(req.params.id);

    if (!asset) return res.status(404).json({ error: "Asset not found" });

    return res.status(200).json();
  }
}

module.exports = new AssetController();
