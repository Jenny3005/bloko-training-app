"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
function loggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
}
