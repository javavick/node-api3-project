const express = require("express");
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");
const {
  validateUser,
  validateUserId,
  validatePost
} = require("../middleware/middleware.js");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((newPost) => res.status(201).json(newPost))
    .catch(() =>
      res.status(500).json({ error: "There was an error adding the user." })
    );
});

router.post("/:id/posts", validatePost, validateUserID, (req, res) => {
  Posts.insert(req.body)
    .then((newPost) => res.status(201).json(newPost))
    .catch(() =>
      res.status(500).json({ error: "There was an error adding the user." })
    );
});

router.get("/", (req, res) => {
  Users.get()
    .then((users) => res.status(200).json(users))
    .catch(() =>
      res.status(500).json({ error: "The data could not be acquired." })
    );
});

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch(() =>
      res
        .status(500)
        .json({ error: "The user with the specified ID could not be found" })
    );
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      if (posts.length <= 0) {
        res.status(404).json({ error: "The posts could not be found." });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "The posts for the specified user could not be retrieved."
      })
    );
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((records) =>
      res.status(200).json({ numberOfDeletedRecords: records })
    )
    .catch(() =>
      res.status(500).json({ error: "The user could not be removed." })
    );
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((count) => res.status(200).json({ numberOfUpdatedRecords: count }))
    .catch(() => res.status(500).json({ error: "Could not update the user." }));
});

module.exports = router;
