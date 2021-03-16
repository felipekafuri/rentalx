"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = require("express");
const CategoriesController_1 = require("../controllers/CategoriesController");
const categoriesRouter = express_1.Router();
exports.categoriesRouter = categoriesRouter;
const categoriesController = new CategoriesController_1.CategoriesController();
categoriesRouter.post('/', categoriesController.create);
