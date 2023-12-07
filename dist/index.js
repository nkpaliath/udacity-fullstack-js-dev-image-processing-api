"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
const PORT = 3000;
exports.app.use('/api', routes_1.default);
exports.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
