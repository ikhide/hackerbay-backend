import imageThumbnail from "image-thumbnail";
import express from "express";
import { validateThumbnailInput } from "../validation/thumbnail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { errors, isValid } = validateThumbnailInput(req.body);

  const { url } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const result = await imageThumbnail({ uri: url }, { width: 50, length: 50 });
  return res.status(200).json({
    status: "success",
    thumbnail: result
  });
});
export default router;
