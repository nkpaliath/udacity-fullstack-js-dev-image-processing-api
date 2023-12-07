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
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const request = (0, supertest_1.default)(__1.app);
const endpointBaseUrl = '/api/images';
describe('Test image processing api', () => {
    it('gets the resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=48`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Buffer);
        expect(response.type).toBe('image/jpeg');
    }));
    it('returns 400 error when filename and/or width and/or height is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield request.get(`${endpointBaseUrl}`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('missing filename, width and/or height in querystring');
        response = yield request.get(`${endpointBaseUrl}?filename=sanatamonica.jpg`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('missing filename, width and/or height in querystring');
        response = yield request.get(`${endpointBaseUrl}?filename=sanatamonica.jpg&width=48`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('missing filename, width and/or height in querystring');
    }));
    it('return 400 error when filename is blank or has extension other than jpg or jpeg', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield request.get(`${endpointBaseUrl}?filename=&width=48&height=48`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('filename is required');
        response = yield request.get(`${endpointBaseUrl}?filename=santamonica.png&width=48&height=48`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('only jpg or jpeg files are supported');
    }));
    it('return 400 error when width is blank or is not an integer greater than zero', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield request.get(`${endpointBaseUrl}?filename=santamonic.jpg&width=&height=48`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('width is required');
        response = yield request.get(`${endpointBaseUrl}?filename=santamonica.jpg&width=0&height=48`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('width should be an integer value greater than 0');
        response = yield request.get(`${endpointBaseUrl}?filename=santamonica.jpg&width=40.50&height=48`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('width should be an integer value greater than 0');
    }));
    it('return 400 error when height is blank or is not an integer greater than zero', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield request.get(`${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('height is required');
        response = yield request.get(`${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=0`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('height should be an integer value greater than 0');
        response = yield request.get(`${endpointBaseUrl}?filename=santamonica.jpg&width=48&height=48.80`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('height should be an integer value greater than 0');
    }));
    it('returns error 404 when image to be resized is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`${endpointBaseUrl}?filename=newyork.jpg&width=48&height=48`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('image not found');
    }));
});
