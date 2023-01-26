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
const getCurrentFollowers_1 = __importDefault(require("./getCurrentFollowers"));
const helpers_1 = __importDefault(require("./helpers"));
const InstagramUsernameData = require("../models/instagramUsernameData");
function updateAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let query = yield InstagramUsernameData.find({ $or: [{ requestTimes: { $gte: 3 } }, { $updatesLeft: { $gt: 3 } },] });
        let allUsers = [];
        for (const u of query) {
            allUsers.push(u.username);
        }
        let a = yield (0, getCurrentFollowers_1.default)(allUsers);
        if (!a)
            return;
        const { status, data } = a;
        if (status === "success") {
            let date = new Date();
            for (const key in data) {
                let userModel = query.find((element) => element.username === key);
                let unfollowersList = [];
                let attFollowers = null;
                if (userModel.followers) {
                    if (userModel.updatesLeft !== 0) {
                        let parsed = JSON.parse(userModel.followers);
                        attFollowers = parsed.filter(function (element) {
                            return data[key].includes(element);
                        });
                        attFollowers = attFollowers.concat(data[key].filter(function (element) {
                            return !parsed.includes(element);
                        }));
                    }
                    unfollowersList = (attFollowers !== null && attFollowers !== void 0 ? attFollowers : JSON.parse(userModel.followers)).filter((x) => !data[key].includes(x));
                    if (attFollowers)
                        attFollowers = (0, helpers_1.default)(attFollowers);
                }
                let requestTimes, updatesLeft;
                if (userModel.updatesLeft !== 0) {
                    requestTimes = userModel.requestTimes;
                    updatesLeft = userModel.updatesLeft - 1;
                }
                else {
                    requestTimes = 0;
                    updatesLeft = 2;
                }
                InstagramUsernameData.updateOne({ username: key }, {
                    $set: {
                        followers: JSON.stringify(attFollowers !== null && attFollowers !== void 0 ? attFollowers : (0, helpers_1.default)(data[key])),
                        lastUpdateFollowers: date,
                        unfollowersList: JSON.stringify((0, helpers_1.default)(unfollowersList)),
                        lastUpdateUnfollowers: date,
                        requestTimes: requestTimes,
                        updatesLeft: updatesLeft
                    }
                }, (err, collection) => {
                    if (err)
                        throw err;
                });
            }
        }
    });
}
exports.default = updateAllUsers;
