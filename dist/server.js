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
const testUsername_1 = __importDefault(require("./functions/testUsername"));
const updateAllUsers_1 = __importDefault(require("./functions/updateAllUsers"));
const testIfUsernameExists_1 = __importDefault(require("./puppeteer/testIfUsernameExists"));
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
// updateAllUsers()
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
    const { user } = req.body;
    let response;
    let userModel = yield (0, testUsername_1.default)(user);
    if (!_.isEmpty(userModel)) {
        (0, increaseOneInRequestTimes_1.default)(userModel);
        if (!!(userModel === null || userModel === void 0 ? void 0 : userModel.unfollowersList)) {
            let parsed = JSON.parse(userModel === null || userModel === void 0 ? void 0 : userModel.unfollowersList);
            response = {
                message: parsed.length > 0
                    ? "unfollowers list"
                    : "seems like no one unfollowed you",
                status: "success",
                data: { unfollowersList: parsed },
            };
        }
        else {
            response = {
                message: "the server didnt updated your unfollower list yet",
                status: "success",
                data: { unfollowersList: [] },
            };
        }
    }
    else {
        const newRegister = {
            username: user,
        };
        if (yield (0, testIfUsernameExists_1.default)(user)) {
            if (!(yield (0, testIfIsPossibleToRegisterNewUsername_1.default)())) {
                response = {
                    message: "limit of registers reached, contact the creator",
                    status: "error",
                };
            }
            yield InstagramUsernameData.create(newRegister);
            response = {
                message: "username registered, c u soon :)",
                status: "success",
            };
        }
        else {
            response = {
                message: "username doesnt exists",
                status: "error",
            };
        }
    }
    return res.json(response);
}));
cron
    .schedule("0 1 * * *", () => {
    (0, updateAllUsers_1.default)();
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo",
})
    .start();
mongoose.connect(String(MONGOOSE)).then(app.listen(8000, () => {
    console.log("Servidor Iniciado.");
}));
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
