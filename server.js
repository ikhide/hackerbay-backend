/* eslint-disable import/extensions */
import express from "express";
import bodyParser from "body-parser";
import login from "./routes/authentication.js";
import jsonPatch from "./routes/jsonPatch.js";
import thumbnail from "./routes/thumbnail.js";
import { verifyToken } from "./utils/token.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handle cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE");
    return res.status(200).json({});
  }

  next();
});

app.use("/api/login", login);
app.use("/api/json-patch", verifyToken, jsonPatch);
app.use("/api/thumbnail", verifyToken, thumbnail);

const port = process.env.PORT || 5009;

app.listen(port, () => console.log(`Server running on Port ${port}`));

export default app;
