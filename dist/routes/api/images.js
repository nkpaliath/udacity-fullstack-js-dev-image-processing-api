"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageProcessing_1 = require("../../utilities/imageProcessing");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.validateImageApi, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.imageToProcess)
        res
            .status(500)
            .json({ error: 'internal server error. please try again later' });
    const { filename, width, height } = res.locals.imageToProcess;
    try {
        const image = yield (0, imageProcessing_1.getThumbnailImage)(filename, width, height);
        if (typeof image === 'string')
            return res.status(200).sendFile(image);
        else
            throw image;
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.toLowerCase().includes('no such file or directory')) {
                return res.status(404).json({ error: 'image not found' });
            }
            else {
                return res
                    .status(500)
                    .json({ error: 'internal server error. please try again later' });
            }
        }
        return res
            .status(500)
            .json({ error: 'internal server error. please try again later' });
    }
}));
exports.default = router;
