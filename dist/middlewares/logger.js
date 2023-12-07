"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    console.log(process.env.NODE_ENV);
    next();
};
exports.default = logger;
