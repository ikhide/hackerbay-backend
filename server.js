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

const app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging
app.use(morgan("combined", { stream: winston.stream }));
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // add this line to include winston logging
//   winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

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

const port = process.env.PORT || 5009;

app.listen(port, () => console.log(`Server running on Port ${port}`));

export default app;
