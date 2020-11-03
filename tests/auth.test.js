import chaiHttp from "chai-http";
import chai from "chai";
import app from "../server.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("Authentication", () => {
  it("Should fail when no username is supplied", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .send({
        username: "",
        password: "test password",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.a("object");
        done();
      });
  });
  it("Should fail when no password is supplied", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .send({
        username: "test username",
        password: "",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.a("object");
        done();
      });
  });
  it("Should pass when username and password is supplied", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .send({
        username: "test username",
        password: "test password",
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.status).to.equal("success");
        expect(res.body.token).to.be.a("string");
        done();
      });
  });
});
