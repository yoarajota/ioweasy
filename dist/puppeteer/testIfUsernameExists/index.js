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
const launch_1 = __importDefault(require("../launch"));
function testIfUsernameExists(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield (0, launch_1.default)();
        const page = yield browser.newPage();
        yield page.goto(`https://www.instagram.com/${user}`);
        let exists;
        yield Promise.race([
            page.waitForSelector("div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > section > main > div > header > section > div._ab8w._ab94._ab99._ab9f._ab9m._ab9p._abcm > div > div > button", { timeout: 7000 }, { timeout: 6000, visible: true })
                .then(() => { exists = true; }).catch(),
            page.waitForSelector("div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > section > main > div > div > div > div", { timeout: 6000, visible: true })
                .then(() => { exists = false; }).catch(),
        ]);
        browser.close();
        return exists;
    });
}
exports.default = testIfUsernameExists;
