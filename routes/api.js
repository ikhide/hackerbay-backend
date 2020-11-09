import postmanToOpenApi from "postman-to-openapi";

const postmanCollection = "docs/Hacker bay.postman_collection.json";
const outputFile = "docs/swagger.yml";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  // Async/await
  try {
    const result = await postmanToOpenApi(postmanCollection, outputFile, {
      defaultTag: "General",
    });
    // Without save the result in a file
    const result2 = await postmanToOpenApi(postmanCollection, null, {
      defaultTag: "General",
    });
    console.log(`OpenAPI specs: ${result}`);
  } catch (err) {
    console.log(err);
  }
});

export default router;
