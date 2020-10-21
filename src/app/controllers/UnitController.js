const Unit = require("../models/Unit");
const Company = require("../models/Company");

class UnitController {
  async index(req, res) {
    const units = await Unit.find().populate("company");

    return res.status(200).json(units);
  }

  async show(req, res) {
    const unit = await Unit.findById(req.params.id).populate("company");

    if (!unit) return res.status(404).json({ error: "Unit not found" });

    return res.status(200).json(unit);
  }

  async store(req, res) {
    const { email, company } = req.body;

    try {
      const emailExists = await Unit.findOne({ email });

      if (emailExists)
        return res.status(400).json({ error: "Email already in use" });

      const companyExists = await Company.findById({ _id: company });

      if (!companyExists)
        return res.status(404).json({ error: "Company not found" });

      const unit = await Unit.create(req.body);

      return res.status(201).json(unit);
    } catch (err) {
      return res.status(400).json({ error: "Creation fails", err });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const unit = await Unit.findById(id);

      if (!unit) return res.status(404).json({ error: "Unit not found" });

      const { email } = req.body;

      if (email !== unit.email) {
        const emailExists = await Unit.findOne({ email });

        if (emailExists)
          return res.status(400).json({ error: "Email already in use" });
      }

      const updatedUnit = await Unit.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json(updatedUnit);
    } catch (err) {
      return res.status(400).json({ error: "Update fails", err });
    }
  }

  async delete(req, res) {
    const unit = await Unit.findByIdAndRemove(req.params.id);

    if (!unit) return res.status(404).json({ error: "Unit not found" });

    return res.status(200).json();
  }
}

module.exports = new UnitController();
