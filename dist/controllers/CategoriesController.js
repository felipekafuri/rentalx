"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const uuid_1 = require("uuid");
const categories = [];
class CategoriesController {
    async create(request, response) {
        const { name, description } = request.body;
        const category = {
            id: uuid_1.v4(),
            name,
            description,
            created_at: new Date()
        };
        categories.push(category);
        return response.status(201).json(category);
    }
}
exports.CategoriesController = CategoriesController;
