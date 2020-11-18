const Asset = require("../models/Asset");

class InfoChart {
  async index(req, res) {
    const { companyId, unitId } = req.query;

    const query = companyId
      ? { company: `${companyId}` }
      : { unit: `${unitId}` };

    const assets = await Asset.find(query);

    let total = assets.length;
    let estavel = 0;
    let alerta = 0;
    let critico = 0;

    const score = assets.filter((asset) => {
      if (asset.healthscore >= 80) {
        estavel++;
      } else if (asset.healthscore < 80 && asset.healthscore > 60) {
        alerta++;
      } else if (asset.healthscore <= 60) {
        critico++;
      }
    });

    return res.status(200).json({ total, estavel, alerta, critico });
  }
}

module.exports = new InfoChart();
