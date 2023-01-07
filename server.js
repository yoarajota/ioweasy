const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const { MONGOOSE } = process.env;
const bodyParser = require("body-parser");
const cron = require('node-cron');
const { default: updateAllUsers } = require("./functions/updateAllUsers");
const { default: testUsername } = require("./functions/testUsername");

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
  let exists = testUsername(user)
  if (!_.isEmpty(exists)) {
    response = { message: 'asdad', status: 'success', data: { unfollowersList: exists.unfollowersList } }
  } else {
    const newRegister = {
      username: user,
    };

    await InstagramUsernameData.create(newRegister);

    response = { message: 'asdad', status: 'success' }
  }

  // let response = await get
  return res.json(response);
});

cron.schedule('0 1 * * *', () => {
  updateAllUsers()
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
}).start();

mongoose.connect(MONGOOSE).then(
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


