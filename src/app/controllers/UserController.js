const User = require("../models/User");
const Unit = require("../models/Unit");
const Company = require("../models/Company");

class UserController {
  async index(req, res) {
    const { companyId } = req.query;

    const query = companyId ? { company: `${companyId}` } : {};

    const users = await User.find(query)
      .populate({ path: "company", select: ["name"] })
      .populate({ path: "unit", select: ["name"] });

    return res.status(200).json(users);
  }

  async show(req, res) {
    const user = await User.findById(req.params.id)
      .populate({ path: "company", select: ["name"] })
      .populate({ path: "unit", select: ["name"] });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
  }

  async store(req, res) {
    const { email, unit, company } = req.body;

    try {
      const emailExists = await User.findOne({ email });

      if (emailExists)
        return res.status(400).json({ error: "Email already in use" });

      const unitExists = await Unit.findById({ _id: unit });

      if (!unitExists) return res.status(404).json({ error: "Unit not found" });

      const companyExists = await Company.findById({ _id: company });

      if (!companyExists)
        return res.status(404).json({ error: "Company not found" });

      const user = await User.create(req.body);

      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Creation fails", err });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) return res.status(404).json({ error: "User not found" });

      const { email } = req.body;

      if (email !== user.email) {
        const emailExists = await User.findOne({ email });

        if (emailExists)
          return res.status(400).json({ error: "Email already in use" });
      }

      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: "Update fails", err });
    }
  }

  async delete(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json();
  }
}

module.exports = new UserController();
