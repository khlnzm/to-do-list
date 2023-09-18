const express = require("express");
const {
  createList,
  getList,
  getLists,
  deleteList,
  updateList,
} = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require for all workout routes
router.use(requireAuth);

//GET all list
router.get("/", getLists);

//Get a list
router.get("/:id", getList);

//POST a new list
router.post("/", createList);

//DELETE a list
router.delete("/:id", deleteList);

//PATCH a list
router.patch("/:id", updateList);

module.exports = router;
