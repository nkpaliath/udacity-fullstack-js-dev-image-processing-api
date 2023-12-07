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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThumbnailImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = require("path");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const ORIGINAL_IMAGES_FOLDER = (0, path_1.join)(__dirname, '..', '..', 'assets', 'images', 'original');
const THUMBNAIL_IMAGES_FOLDER = (0, path_1.join)(__dirname, '..', '..', 'assets', 'images', 'thumbnail');
const createThumbnailImage = (filename, width, height, thumbnailImagePath) => __awaiter(void 0, void 0, void 0, function* () {
    const originalImagePath = (0, path_1.join)(ORIGINAL_IMAGES_FOLDER, filename);
    try {
        const result = yield (0, promises_1.readFile)(originalImagePath);
        yield (0, sharp_1.default)(result).resize(width, height).toFile(thumbnailImagePath);
        return thumbnailImagePath;
    }
    catch (error) {
        return error;
    }
});
const getThumbnailImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const fileExtn = (0, path_1.extname)(filename);
    const filenameWithoutExtn = filename.replace(fileExtn, '');
    const newFileName = `${filenameWithoutExtn}_${width}_${height}${fileExtn}`;
    const thumbnailImagePath = (0, path_1.join)(THUMBNAIL_IMAGES_FOLDER, newFileName);
    if ((0, fs_1.existsSync)(thumbnailImagePath)) {
        try {
            return thumbnailImagePath;
        }
        catch (error) {
            return error;
        }
    }
    else {
        return createThumbnailImage(filename, width, height, thumbnailImagePath);
    }
});
exports.getThumbnailImage = getThumbnailImage;
