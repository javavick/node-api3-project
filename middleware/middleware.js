const Data = require("../users/userDb.js");

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} on ${req.url}`);
  next();
};

function validateUserId(req, res, next) {
  Data.getById(req.params.id)
    .then((user) => {
      if (user.length > 0) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user ID." });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "There was an issue getting the specified user." })
    );
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing user data." });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field." });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing post data." });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field." });
  } else {
    next();
  }
}

module.exports = { logger, validateUser, validateUserId, validatePost };
