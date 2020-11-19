import chaiHttp from "chai-http";
import chai from "chai";
import app from "../server.js";
import { generateToken } from "../utils/token.js";

chai.use(chaiHttp);
const { expect } = chai;
const name = "username";
const password = "password";
const token = generateToken({ name, password });

describe("Image thumbnail", () => {
  describe("Token Failure", () => {
    it("Should return Unauthorized when token is not supplied", (done) => {
      chai
        .request(app)
        .post("/api/thumbnail")
        .set("Accept", "application/json")
        .send({
          url:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal("error");
          expect(res.body.message).to.equal("Unauthorized");
          done();
        });
    });
    it("Should return invalid token when token is invalid", (done) => {
      chai
        .request(app)
        .post("/api/thumbnail")
        .set("Accept", "application/json")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewJ1c2VybmFtZSI6ImtvbGEiLCJwYXNzd29yZCI6Im5mZGYiLCJpYXQiOjE1ODc3MzIzMzYsImV4cCI6MTU4NzczNTkzNn0.6CjatyGeybhQvZY8izragnWBx4IOPvRbRsAeSPZELPDL"
        )
        .send({
          url:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal("error");
          expect(res.body.message).to.equal("Invalid token");
          done();
        });
    });
  });

  describe("Field failure", () => {
    it("Should return error message when image url is not provided", (done) => {
      chai
        .request(app)
        .post("/api/thumbnail")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          url: ""
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.url).to.equal("Image url is required");
          done();
        });
    });

    it("Should return an error when image url is invalid", (done) => {
      chai
        .request(app)
        .post("/api/thumbnail")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          url:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jp"
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.url).to.equal("Invalid image type");
          done();
        });
    });

    describe("Field Success", () => {
      it("Should successfully convert the image to thumbnail when all requirements are met", (done) => {
        chai
          .request(app)
          .post("/api/thumbnail")
          .set("Accept", "application/json")
          .set("Authorization", `Bearer ${token}`)
          .send({
            url:
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.thumbnail).to.be.an("object");
            done();
          });
      });
    });
  });
});
