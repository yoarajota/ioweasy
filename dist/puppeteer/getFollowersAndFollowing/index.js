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
const auth_1 = __importDefault(require("../auth"));
const launch_1 = __importDefault(require("../launch"));
const passThroughAndGet_1 = __importDefault(require("../passThroughAndGet"));
function getFollowersAndFollowing(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = [];
        const browser = yield (0, launch_1.default)();
        const page = yield browser.newPage();
        yield (0, auth_1.default)(page);
        yield page.waitForSelector("div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div");
        const page2 = yield browser.newPage();
        // const page3 = await browser.newPage();
        // return await Promise.all([passThroughAndGet('followers', response, page2, user), passThroughAndGet('following', response, page3, user)])
        //     .then((res) => {
        //         let values: any = Object.values(res);
        //         response['followers'] = values[0][user];
        //         response['following'] = values[1][user];
        //         response['followers'] = passThroughAndGet('followers', response, page2, user);
        //         response['following'] = passThroughAndGet('following', response, page3, user);
        //         browser.close();
        //         return response;
        //     })
        let f1 = [];
        let f2 = [];
        response['followers'] = Object.values(yield (0, passThroughAndGet_1.default)('followers', f1, page2, user))[0];
        response['following'] = Object.values(yield (0, passThroughAndGet_1.default)('following', f2, page2, user))[0];
        browser.close();
        return response;
    });
}
exports.default = getFollowersAndFollowing;
