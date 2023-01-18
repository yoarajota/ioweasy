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
const query = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    let arr = [];
    for (let i = 0; i < 2; i++) {
        let b = document.getElementsByClassName("_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8 _abcm");
        arr[i] = [];
        for (let x of b) {
            arr[i].push((_k = (_j = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = x.children[1]) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.firstChild) === null || _c === void 0 ? void 0 : _c.firstChild) === null || _d === void 0 ? void 0 : _d.firstChild) === null || _e === void 0 ? void 0 : _e.firstChild) === null || _f === void 0 ? void 0 : _f.firstChild) === null || _g === void 0 ? void 0 : _g.firstChild) === null || _h === void 0 ? void 0 : _h.firstChild) === null || _j === void 0 ? void 0 : _j.data) !== null && _k !== void 0 ? _k : (_t = (_s = (_r = (_q = (_p = (_o = (_m = (_l = x.children[1]) === null || _l === void 0 ? void 0 : _l.firstChild) === null || _m === void 0 ? void 0 : _m.firstChild) === null || _o === void 0 ? void 0 : _o.firstChild) === null || _p === void 0 ? void 0 : _p.firstChild) === null || _q === void 0 ? void 0 : _q.firstChild) === null || _r === void 0 ? void 0 : _r.firstChild) === null || _s === void 0 ? void 0 : _s.firstChild) === null || _t === void 0 ? void 0 : _t.data);
        }
    }
    arr = arr[1].concat(arr[2]);
    arr = arr.filter((item, index) => {
        return (arr.indexOf(item) == index);
    });
    return arr;
};
function passThroughAndGet(type, response, page, user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto(`https://www.instagram.com/${user}`);
        yield page.waitForSelector("section > main > div > ul > li > a > div > span > span");
        let countFollowers = yield page.$eval("section > main > div > ul > li:nth-child(2) > a > div > span > span", (el) => { var _a; return (_a = el.firstChild) === null || _a === void 0 ? void 0 : _a.data; });
        countFollowers = Number(countFollowers.replace(".", ""));
        yield page.goto(`https://www.instagram.com/${user}/${type}`);
        yield page.waitForSelector("div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div.x1qjc9v5.x78zum5.xdt5ytf > div > div._ab8w._ab94._ab97._ab9h._ab9m._ab9p._abch._abcm > h1 > div");
        let oldSrollHeight;
        let iterationsLimit = 30;
        while (countFollowers > 0) {
            yield page.waitForSelector("div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano");
            let scroll = yield page.$eval("div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano", (el) => el.scrollHeight);
            if (oldSrollHeight !== scroll) {
                countFollowers--;
                iterationsLimit = 30;
            }
            iterationsLimit--;
            oldSrollHeight = scroll;
            yield page.evaluate(() => {
                var _a;
                let a = document.querySelector("div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano");
                if (a)
                    a.scrollTop = (_a = a === null || a === void 0 ? void 0 : a.scrollHeight) !== null && _a !== void 0 ? _a : 0;
            });
            if (iterationsLimit === 0)
                countFollowers = 0;
        }
        let arr = yield page.evaluate(query);
        console.log(arr);
        return Object.assign(Object.assign({}, response), { [user]: arr });
    });
}
exports.default = passThroughAndGet;
