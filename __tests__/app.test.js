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
  describe("/api/categories", () => {
    describe("GET", () => {
      it("200 responds with an array of category objects", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then(({ body }) => {
            body.categories.forEach((category) => {
              expect(category).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
              });
            });
          });
      });
    });
  });
  describe("/api/reviews", () => {
    describe("/:review_id", () => {
      describe("GET", () => {
        it("200 responds with a review object", () => {
          return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.review).toMatchObject({
                review_id: 1,
                title: "Agricola",
                designer: "Uwe Rosenberg",
                owner: "mallionaire",
                review_img_url:
                  "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                review_body: "Farmyard fun!",
                category: "euro game",
                created_at: "2021-01-18T10:00:20.514Z",
                votes: 1,
              });
            });
        });
        it("400 responds with bad request when given an invalid review_id", () => {
          return request(app)
            .get("/api/reviews/dog")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual("Bad request");
            });
        });
        it("404 responds with not found when given a review_id that does not exist", () => {
          return request(app)
            .get("/api/reviews/99999")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toEqual("Review id 99999 does not exist");
            });
        });
      });
    });
  });
});
