"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
    description: zod_1.z
        .string()
        .min(10, "La description doit contenir au  moins 10 caractères"),
    price: zod_1.z.number().positive("Le prix doit être positif"),
});
exports.updateProductSchema = exports.createProductSchema.partial();
