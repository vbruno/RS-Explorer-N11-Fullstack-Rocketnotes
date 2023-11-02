const { Router } = require("express");
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const TagsController = require("../controllers/TagsController");

const tagsRouter = Router();

const tagsController = new TagsController();

tagsRouter.get("/",ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;
