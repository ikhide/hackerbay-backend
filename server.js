/* eslint-disable import/extensions */
import express from "express";
import bodyParser from "body-parser";
import login from "./routes/authentication.js";
import jsonPatch from "./routes/jsonPatch.js";
import thumbnail from "./routes/thumbnail.js";
import { verifyToken } from "./utils/token.js";
import morgan from "morgan";
import winston from "./config/winston.js";
import logging from "./routes/logging.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./docs/swagger.yaml");

const app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging
app.use(morgan("combined", { stream: winston.stream }));

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
app.use("/api/log", verifyToken, logging);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 5009;

app.listen(port, () => console.log(`Server running on Port ${port}`));

export default app;
