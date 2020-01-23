const express = require("express");
const Data = require("./userDb.js");
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  Data.get()
    .then((users) => res.status(200).json(users))
    .catch(() =>
      res.status(500).json({ error: "The data could not be acquired." })
    );
});

router.get("/:id", (req, res) => {
  Data.getById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch(() =>
      res
        .status(500)
        .json({ error: "The user with the specified ID could not be found" })
    );
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

module.exports = router;
