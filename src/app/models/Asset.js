const mongoose = require("../../database");

const AssetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    healthscore: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Disponível", "Em manutenção", "Desativado"],
      default: "Disponível",
      required: true,
    },
    responsible: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", AssetSchema);

module.exports = Asset;
