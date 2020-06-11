const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", validateUser(), (req, res, next) => {
  userDb
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res, next) => {
  userDb
    .get()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId(), (req, res, next) => {
  userDb
    .remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "The user was removed successfully",
      });
    })
    .catch(next);
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    userDb
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({
            message: "Invalid user id",
          });
        }
      })
      .catch(next);
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing user data",
      });
    } else if (!req.body.name) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }

    next();
  };
}

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
