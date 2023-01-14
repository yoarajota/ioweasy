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
require("dotenv").config();
const query = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    let b = document.getElementsByClassName("_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8 _abcm");
    let arr = [];
    for (let x of b) {
        arr.push((_k = (_j = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = x.children[1]) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.firstChild) === null || _c === void 0 ? void 0 : _c.firstChild) === null || _d === void 0 ? void 0 : _d.firstChild) === null || _e === void 0 ? void 0 : _e.firstChild) === null || _f === void 0 ? void 0 : _f.firstChild) === null || _g === void 0 ? void 0 : _g.firstChild) === null || _h === void 0 ? void 0 : _h.firstChild) === null || _j === void 0 ? void 0 : _j.data) !== null && _k !== void 0 ? _k : (_t = (_s = (_r = (_q = (_p = (_o = (_m = (_l = x.children[1]) === null || _l === void 0 ? void 0 : _l.firstChild) === null || _m === void 0 ? void 0 : _m.firstChild) === null || _o === void 0 ? void 0 : _o.firstChild) === null || _p === void 0 ? void 0 : _p.firstChild) === null || _q === void 0 ? void 0 : _q.firstChild) === null || _r === void 0 ? void 0 : _r.firstChild) === null || _s === void 0 ? void 0 : _s.firstChild) === null || _t === void 0 ? void 0 : _t.data);
    }
    return arr;
};
function debug() {
    return __awaiter(this, void 0, void 0, function* () {
        let tryes = 5;
        function work() {
            return __awaiter(this, void 0, void 0, function* () {
                const browser = yield (0, launch_1.default)();
                const page = yield browser.newPage();
                yield (0, auth_1.default)(page);
                yield page.waitForSelector("div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div");
                const page2 = yield browser.newPage();
                yield page2.goto(`https://www.instagram.com/nekr0zi`);
                yield page2.waitForSelector("section > main > div > ul > li > a > div > span > span");
                let countFollowers = yield page2.$eval("section > main > div > ul > li:nth-child(2) > a > div > span > span", (el) => { var _a; return (_a = el.firstChild) === null || _a === void 0 ? void 0 : _a.data; });
                countFollowers = Number(countFollowers.replace(".", ""));
                yield page2.goto(`https://www.instagram.com/nekr0zi/followers`);
            });
        }
        work();
    });
}
exports.default = debug;
