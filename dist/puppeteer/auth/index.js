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
const { LOGIN, PASSWORD } = process.env;
function auth(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield page.goto("https://www.instagram.com/accounts/login/");
        }
        catch (_a) {
            yield page.goto("https://www.instagram.com/");
        }
        yield page.waitForSelector("#loginForm > div > div:nth-child(3) > button");
        yield page.type("input[name='username']", String(LOGIN), { delay: 6 });
        yield page.type("input[name='password']", String(PASSWORD), {
            delay: 6,
        });
        // await page.waitFor(100)
        let btn = yield page.waitForSelector("#loginForm > div > div:nth-child(3) > button");
        btn.click();
    });
}
exports.default = auth;
