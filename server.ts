const cors = require("cors");
require("dotenv").config();
const { MONGOOSE } = process.env;
const bodyParser = require("body-parser");
const cron = require("node-cron");
const _ = require("lodash");
import express from "express";
import increaseOneInRequestTimes from "./functions/increaseOneInRequestTimes";
import testIfIsPossibleToRegisterNewUsername from "./functions/testIfIsPossibleToRegisterNewUsername";
import updateAllUsers from "./functions/updateAllUsers";
import getFollowersAndFollowing from "./puppeteer/getFollowersAndFollowing";
import testIfUsernameExists from "./puppeteer/testIfUsernameExists";
import userModel from "./functions/userModel";
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
  process.exit(1);
});

app.post("/followers", async (req, res) => {
  const { user, type, followers_list, following_list } = req.body;
  let response;
  switch (type) {
    case 0:
      response = await type0(followers_list, following_list);
      break;
    case 1:
      response = await type1(user);
      break;
    case 2:
      response = await type2(user);
      break;
    default:
      break;
  }

  return res.json(response);
});

async function type0(
  followers_list: Array<string>,
  following_list: Array<string>
) {
  let set1 = new Set(followers_list);
  let set2 = new Set(following_list);
  let difference = [...set2].filter((x) => !set1.has(x));
  return {
    message: "list of the diference between yor followers and following",
    status: "success",
    data: { list: difference },
  };
}

async function type1(user: string) {
  let response;
  let model = await userModel(user);
  if (!_.isEmpty(model)) {
    increaseOneInRequestTimes(model);
    if (model?.unfollowersList) {
      response = {
        message:
          model?.unfollowersList.length > 0
            ? "unfollowers list"
            : "seems like no one unfollowed you",
        status: "success",
        data: { list: model?.unfollowersList },
      };
    } else {
      response = {
        message: "the server didnt updated your unfollower list yet",
        status: "success",
        data: { list: [] },
      };
    }
  } else {
    let test = await testIfUsernameExists(user);
    if (test[0] && test[1]) {
      if (!(await testIfIsPossibleToRegisterNewUsername())) {
        response = {
          message: "limit of registers reached, contact the creator",
          status: "error",
        };
      }

      const newRegister = {
        username: user,
      };

      await InstagramUsernameData.create(newRegister);

      response = {
        message: "username registered, c u soon :)",
        status: "success",
      };
    } else {
      response = {
        message: !test[0]
          ? "username doesnt exists"
          : "username has private account",
        status: "error",
      };
    }
  }

  return response;
}

async function type2(user: string) {
  try {
    let response;
    let test = await testIfUsernameExists(user);
    if (test[0] && test[1]) {
      let data = await getFollowersAndFollowing(user);
      let model = await userModel(user);
      if (model.followers) {
        let c = model.followers.filter(function (element: string) {
          return data["followers"].includes(element);
        });

        c = c.concat(
          data["followers"].filter(function (element: string) {
            return !model.followers.includes(element);
          })
        );
      }

      let diference = data["following"].filter(
        (x: any) => !data["followers"].includes(x)
      );

      response = {
        message: "the diference of followers to following",
        status: "success",
        data: { list: diference },
      };
    } else {
      response = {
        message: !test[0]
          ? "username doesnt exists"
          : "username has private account",
        status: "error",
      };
    }

    return response;
  } catch (error) {
    return {
      message: "server or instagram error, please try again later",
      status: "error",
    };
  }
}

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

if (MONGOOSE) {
  mongoose.connect(String(MONGOOSE)).then(
    app.listen(8000, () => {
      console.log("Servidor Iniciado com conexão ao Atlas.");
    })
  );
} else {
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
