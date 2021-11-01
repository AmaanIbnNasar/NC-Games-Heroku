const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("app", () => {
  describe("/api", () => {
    it("200 responds with a message saying all okay", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).toEqual("All okay");
        });
    });
  });
});
