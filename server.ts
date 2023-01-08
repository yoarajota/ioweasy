const cors = require("cors");
require("dotenv").config();
const { MONGOOSE } = process.env;
const bodyParser = require("body-parser");
const cron = require("node-cron");
const _ = require("lodash");
import express from "express";
import testUsername from "./functions/testUsername";
import updateAllUsers from "./functions/updateAllUsers";
const app = express();
const mongoose = require("mongoose");
const InstagramUsernameData = require("./models/instagramUsernameData");

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Acess-Control-Allow-Headers",
    "X-PINGOTHER, Content-Type, 'Authorization'"
  );
  app.use(cors());
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
  })
);

process.on("uncaughtException", (error) => {
  console.log("Alert! ERROR : ", error);
  process.exit(1); // Exit your app
});

app.post("/followers", async (req, res) => {
  const { user } = req.body;
  let response;
  let exists = await testUsername(user);
  if (!_.isEmpty(exists)) {
    response = {
      message: "temmmm",
      status: "success",
      data: { unfollowersList: exists?.unfollowersList },
    };
  } else {
    const newRegister = {
      username: user,
    };

    await InstagramUsernameData.create(newRegister);

    response = { message: "asdad opi oi oi oioi io io", status: "success" };
  }

  // let response = await get
  return res.json(response);
});

console.log(InstagramUsernameData.find()[0]);

cron
  .schedule(
    "0 1 * * *",
    () => {
      updateAllUsers();
    },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    }
  )
  .start();

mongoose.connect(String(MONGOOSE)).then(
  app.listen(8000, () => {
    console.log("Servidor Iniciado.");
  })
);

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
