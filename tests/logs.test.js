import chaiHttp from "chai-http";
import chai from "chai";
import app from "../server.js";
import { generateToken } from "../utils/token.js";

chai.use(chaiHttp);
const { expect } = chai;
const name = "username";
const password = "password";
const token = generateToken({ name, password });

describe("Successful view logs request", () => {
  it("Should print out all logs", (done) => {
    chai
      .request(app)
      .get("/api/log")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res.text).to.be.an("string");
        done();
      });
  });
});
