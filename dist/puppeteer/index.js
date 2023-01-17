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
const auth_1 = __importDefault(require("./auth"));
const launch_1 = __importDefault(require("./launch"));
const passThroughAndGet_1 = __importDefault(require("./passThroughAndGet"));
require("dotenv").config();
function getFollowers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {};
        let tryes = 5;
        function work() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const browser = yield (0, launch_1.default)();
                    const page = yield browser.newPage();
                    yield (0, auth_1.default)(page);
                    yield page.waitForSelector("div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div");
                    const page2 = yield browser.newPage();
                    for (let user of users) {
                        if (response[user] !== undefined)
                            continue;
                        response = yield (0, passThroughAndGet_1.default)('followers', response, page2, user);
                    }
                    yield browser.close();
                    return { status: "success", data: response };
                }
                catch (error) {
                    if (tryes !== 0) {
                        tryes--;
                        work();
                    }
                    else if (tryes === 0) {
                        return { status: "error", data: [] };
                    }
                }
            });
        }
        return yield work();
    });
}
exports.default = getFollowers;
