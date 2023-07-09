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
const cors = require("cors");
require("dotenv").config();
const { MONGOOSE } = process.env;
const bodyParser = require("body-parser");
const cron = require("node-cron");
const _ = require("lodash");
const express_1 = __importDefault(require("express"));
const increaseOneInRequestTimes_1 = __importDefault(require("./functions/increaseOneInRequestTimes"));
const testIfIsPossibleToRegisterNewUsername_1 = __importDefault(require("./functions/testIfIsPossibleToRegisterNewUsername"));
const updateAllUsers_1 = __importDefault(require("./functions/updateAllUsers"));
const getFollowersAndFollowing_1 = __importDefault(require("./puppeteer/getFollowersAndFollowing"));
const testIfUsernameExists_1 = __importDefault(require("./puppeteer/testIfUsernameExists"));
const userModel_1 = __importDefault(require("./functions/userModel"));
const app = (0, express_1.default)();
const mongoose = require("mongoose");
const InstagramUsernameData = require("./models/instagramUsernameData");
app.use((req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Acess-Control-Allow-Headers", "X-PINGOTHER, Content-Type, 'Authorization'");
    app.use(cors());
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors({
    origin: "*",
}));
process.on("uncaughtException", (error) => {
    console.log("Alert! ERROR : ", error);
    process.exit(1);
});
app.post("/followers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, type, followers_list, following_list } = req.body;
    let response;
    switch (type) {
        case 0:
            response = yield type0(followers_list, following_list);
            break;
        case 1:
            response = yield type1(user);
            break;
        case 2:
            response = yield type2(user);
            break;
        default:
            break;
    }
    return res.json(response);
}));
function type0(followers_list, following_list) {
    return __awaiter(this, void 0, void 0, function* () {
        let set1 = new Set(followers_list);
        let set2 = new Set(following_list);
        let difference = [...set1].filter((x) => !set2.has(x));
        return {
            message: "list of the diference between yor followers and following",
            status: "success",
            data: { list: difference },
        };
    });
}
function type1(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let model = yield (0, userModel_1.default)(user);
        if (!_.isEmpty(model)) {
            (0, increaseOneInRequestTimes_1.default)(model);
            if (model === null || model === void 0 ? void 0 : model.unfollowersList) {
                response = {
                    message: (model === null || model === void 0 ? void 0 : model.unfollowersList.length) > 0
                        ? "unfollowers list"
                        : "seems like no one unfollowed you",
                    status: "success",
                    data: { list: model === null || model === void 0 ? void 0 : model.unfollowersList },
                };
            }
            else {
                response = {
                    message: "the server didnt updated your unfollower list yet",
                    status: "success",
                    data: { list: [] },
                };
            }
        }
        else {
            let test = yield (0, testIfUsernameExists_1.default)(user);
            if (test[0] && test[1]) {
                if (!(yield (0, testIfIsPossibleToRegisterNewUsername_1.default)())) {
                    response = {
                        message: "limit of registers reached, contact the creator",
                        status: "error",
                    };
                }
                const newRegister = {
                    username: user,
                };
                yield InstagramUsernameData.create(newRegister);
                response = {
                    message: "username registered, c u soon :)",
                    status: "success",
                };
            }
            else {
                response = {
                    message: !test[0]
                        ? "username doesnt exists"
                        : "username has private account",
                    status: "error",
                };
            }
        }
        return response;
    });
}
function type2(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response;
            let test = yield (0, testIfUsernameExists_1.default)(user);
            if (test[0] && test[1]) {
                let data = yield (0, getFollowersAndFollowing_1.default)(user);
                let model = yield (0, userModel_1.default)(user);
                if (model.followers) {
                    let c = model.followers.filter(function (element) {
                        return data["followers"].includes(element);
                    });
                    c = c.concat(data["followers"].filter(function (element) {
                        return !model.followers.includes(element);
                    }));
                }
                let diference = data["following"].filter((x) => !data["followers"].includes(x));
                response = {
                    message: "the diference of followers to following",
                    status: "success",
                    data: { list: diference },
                };
            }
            else {
                response = {
                    message: !test[0]
                        ? "username doesnt exists"
                        : "username has private account",
                    status: "error",
                };
            }
            return response;
        }
        catch (error) {
            return {
                message: "server or instagram error, please try again later",
                status: "error",
            };
        }
    });
}
cron
    .schedule("0 1 * * *", () => {
    (0, updateAllUsers_1.default)();
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo",
})
    .start();
if (MONGOOSE) {
    mongoose.connect(String(MONGOOSE)).then(app.listen(8000, () => {
        console.log("Servidor Iniciado com conexão ao Atlas.");
    }));
}
else {
    app.listen(8000, () => {
        console.log("Servidor Iniciado.");
    });
}
//                                      .              .,,,,,,         .,,,,,,,,,,,,,,.
//      #@.  (&.  .@,                 #@*              .****&@         (@/*********@@,
//       ,@/@#    .@,               (@@@*                  .&@         *#        #@(
//        ,@(     ,@,             /@&.%@*                  .&@                 *@#
//        ,@(  &@@@/            /@&,  %@*                  .&@               ,&@.
//                            ,@@,    %@*                  .&@              &@&%*
//                          *@@*      %@*                  .&@                  .(&@/
//                        ,&@/        %@*       %@@.       .&@                     .%@/
//                      .&@(          %@*                  .&@                       #@*
//                     (%%%%%%%%%%%%%%@@&%%%%              .&@                       *@(
//                                    %@*                  .&@                      .@&.
//                                    %@*                  .&@         *.          #@&
//                                *%%%@@&%%%    &@@,    (%%%@@%%%(     /&@@#///#&@@(
