const express = require("express");

// const [ROUTER]= require('./routers/[ROUTER.js]') //CHANGE321
const Characters = require("../characters/characters_helper");

const server = express();

server.use(express.json());
// server.use(helmet());
// server.use('/api/[ROUTER_PATH]', [ROUTER]) //CHANGE321

server.get("/", (req, res) => {
  res.status(200).json({ Victor_Frankenstein: "It LIVEEEESSSSSSS" });
});

server.get("/characters", (req, res) => {
  Characters.find().then((characters) => {
    res.status(200).json(characters);
  });
});

server.post("/characters", (req, res) => {
  let newCharacter = req.body;
  if (req.body.name) {
    Characters.add(newCharacter)
      .then((character) => {
        res.status(201).json({ character });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: "Please provide a name" });
  }
});

server.delete("/characters/:id", (req, res) => {
  const id = req.params.id;
  Characters.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find character with given ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = server;
