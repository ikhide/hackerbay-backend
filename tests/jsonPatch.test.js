import chaiHttp from "chai-http";
import chai from "chai";
import app from "../server.js";
import { generateToken } from "../utils/token.js";

chai.use(chaiHttp);
const { expect } = chai;
const name = "username";
const password = "password";
const token = generateToken({ name, password });

describe("json patch", () => {
  describe("Token Failure", () => {
    it("Should return Unauthorized when token is not supplied", (done) => {
      chai
        .request(app)
        .patch("/api/json-patch")
        .set("Accept", "application/json")
        .send({
          baseJson: {
            baz: "qux",
            foo: "bar"
          },
          jsonPatchObject: [{ op: "replace", path: "/baz", value: "boo" }]
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
        .patch("/api/json-patch")
        .set("Accept", "application/json")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewJ1c2VybmFtZSI6ImtvbGEiLCJwYXNzd29yZCI6Im5mZGYiLCJpYXQiOjE1ODc3MzIzMzYsImV4cCI6MTU4NzczNTkzNn0.6CjatyGeybhQvZY8izragnWBx4IOPvRbRsAeSPZELPDL"
        )
        .send({
          baseJson: {
            baz: "qux",
            foo: "bar"
          },
          jsonPatchObject: [{ op: "replace", path: "/baz", value: "boo" }]
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal("error");
          expect(res.body.message).to.equal("Invalid token");
          done();
        });
    });
  });

  describe("Field Requirement", () => {
    it("Should return BaseJson is required when baseJson is not provided", (done) => {
      chai
        .request(app)
        .patch("/api/json-patch")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          jsonPatchObject: [{ op: "replace", path: "/baz", value: "boo" }]
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.baseJson).to.equal("BaseJson is required");
          done();
        });
    });
    it("Should return jsonPatchObject field is required when jsonPatchObject is not provided", (done) => {
      chai
        .request(app)
        .patch("/api/json-patch")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          baseJson: {
            baz: "qux",
            foo: "bar"
          }
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.jsonPatchObject).to.equal(
            "jsonPatchObject field is required"
          );
          done();
        });
    });
  });

  describe("Field Type", () => {
    it("Should return BaseJson error when non-object is provided", (done) => {
      chai
        .request(app)
        .patch("/api/json-patch")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          baseJson: "string",
          jsonPatchObject: [{ op: "replace", path: "/baz", value: "boo" }]
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.baseJson).to.equal("BaseJson must be an object");
          expect(res.body).to.be.an("object");
          done();
        });
    });

    it("Should return jsonPatchObject error when non-array is provided", (done) => {
      chai
        .request(app)
        .patch("/api/json-patch")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          baseJson: {
            baz: "qux",
            foo: "bar"
          },
          jsonPatchObject: "string"
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.jsonPatchObject).to.equal(
            "jsonPatchObject must be an array"
          );
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  describe("Field Success", () => {
    it("Should return success when all requirements are met", (done) => {
      chai
        .request(app)
        .patch("/api/json-patch")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          baseJson: {
            baz: "qux",
            foo: "bar"
          },
          jsonPatchObject: [{ op: "replace", path: "/baz", value: "boo" }]
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal("success");
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
});
