const express = require("express");

const UserController = require("./app/controllers/UserController");
const CompanyController = require("./app/controllers/CompanyController");
const UnitController = require("./app/controllers/UnitController");
const AssetController = require("./app/controllers/AssetController");
const CategoryController = require("./app/controllers/CategoryController");

const router = express.Router();

router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users", UserController.store);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

router.get("/company", CompanyController.index);
router.get("/company/:id", CompanyController.show);
router.post("/company", CompanyController.store);
router.put("/company/:id", CompanyController.update);
router.delete("/company/:id", CompanyController.delete);

router.get("/unit", UnitController.index);
router.get("/unit/:id", UnitController.show);
router.post("/unit", UnitController.store);
router.put("/unit/:id", UnitController.update);
router.delete("/unit/:id", UnitController.delete);

router.get("/asset", AssetController.index);
router.get("/asset/:id", AssetController.show);
router.post("/asset", AssetController.store);
router.put("/asset/:id", AssetController.update);
router.delete("/asset/:id", AssetController.delete);

router.get("/category", CategoryController.index);
router.get("/category/:id", CategoryController.show);
router.post("/category", CategoryController.store);
router.put("/category/:id", CategoryController.update);
router.delete("/category/:id", CategoryController.delete);

module.exports = router;
