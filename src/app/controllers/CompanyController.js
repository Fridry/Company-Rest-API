const Company = require("../models/Company");

class CompanyController {
  async index(req, res) {
    const companies = await Company.find();

    return res.status(200).json(companies);
  }

  async show(req, res) {
    const company = await Company.findById(req.params.id);

    if (!company) return res.status(404).json({ error: "Company not found" });

    return res.status(200).json(company);
  }

  async store(req, res) {
    try {
      const emailExists = await Company.findOne({ email: req.body.email });

      if (emailExists)
        return res.status(400).json({ error: "Email already in use" });

      const company = await Company.create(req.body);

      return res.status(201).json(company);
    } catch (err) {
      return res.status(400).json({ error: "Creation fails", err });
    }
  }

  async update(req, res) {
    try {
      const company = await Company.findById(req.params.id);

      if (!company) return res.status(404).json({ error: "Company not found" });

      const { email } = req.body;

      if (email !== company.email) {
        const emailExists = await Company.findOne({ email });

        if (emailExists)
          return res.status(400).json({ error: "Email already in use" });
      }

      const updatedCompany = await Company.findOneAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json(updatedCompany);
    } catch (err) {
      return res.status(400).json({ error: "Update fails", err });
    }
  }

  async delete(req, res) {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) return res.status(404).json({ error: "Company not found" });

    return res.status(200).json();
  }
}

module.exports = new CompanyController();
