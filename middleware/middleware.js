const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} on ${req.url}`);
  next();
};

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = { logger, validateUser, validateUserId, validatePost };
