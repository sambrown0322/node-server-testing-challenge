const supertest = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

describe("server", () => {
  describe("GET /", () => {
    it("should return HTTP status code 200", async () => {
      await supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return JSON", async () => {
      await supertest(server)
        .get("/")
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("returns frankenstein property with value IT LIVES", async () => {
      await supertest(server)
        .get("/")
        .then((res) => {
          expect(res.body.Victor_Frankenstein).toBe("It LIVEEEESSSSSSS");
        });
    });
  });
  describe("POST /characters", () => {
    beforeEach(async () => {
      await db("characters").truncate();
    });
    it("should return HTTP 201", () => {
      return supertest(server)
        .post("/characters")
        .send({ name: "Tryndamere" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should fail with code 400 if passed the incorrect data", () => {
      return supertest(server)
        .post("/characters")
        .send({})
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
    it("should insert the character into the db", async () => {
      const character = await supertest(server)
        .post("/characters")
        .send({ name: "Darius" });

      expect(character.body.character.name).toBe("Darius");
    });
  });
  describe("GET /characters", () => {
    it("Can get a list of all characters", () => {
      return supertest(server)
        .get("/characters")
        .then((res) => {
          expect(res.body).toHaveLength(1);
        });
    });
  });
  describe("DELETE /characters/:id", () => {
    it("should return 404 if it can't find character with matching id", () => {
      return supertest(server)
        .delete("/characters/2")
        .then((res) => {
          expect(res.status).toBe(404);
        });
    });
    it("should return 204 upon successful deletion", () => {
      return supertest(server)
        .delete("/characters/1")
        .then((res) => {
          expect(res.status).toBe(204);
        });
    });
  });
});
