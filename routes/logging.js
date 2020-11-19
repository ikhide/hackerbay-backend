import fileSystem from "fs";
import path from "path";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.set("content-type", "text/plain");
  const data = fileSystem.readFileSync(
    path.join(process.cwd(), "/logs/app.log")
  );
  return res.status(200).send(data);
});

export default router;
