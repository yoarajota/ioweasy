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
const testUsername_1 = __importDefault(require("./functions/testUsername"));
const updateAllUsers_1 = __importDefault(require("./functions/updateAllUsers"));
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
    process.exit(1); // Exit your app
});
app.post("/followers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    let response;
    let exists = yield (0, testUsername_1.default)(user);
    if (!_.isEmpty(exists)) {
        response = {
            message: "temmmm",
            status: "success",
            data: { unfollowersList: exists === null || exists === void 0 ? void 0 : exists.unfollowersList },
        };
    }
    else {
        const newRegister = {
            username: user,
        };
        yield InstagramUsernameData.create(newRegister);
        response = { message: "asdad opi oi oi oioi io io", status: "success" };
    }
    // let response = await get
    return res.json(response);
}));
console.log(InstagramUsernameData.find()[0]);
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
