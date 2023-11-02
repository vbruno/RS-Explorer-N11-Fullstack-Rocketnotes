const { Router } = require("express");
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const NotesController = require("../controllers/NotesController");

const notesRouter = Router();

const notesController = new NotesController();

notesRouter.use(ensureAuthenticated)

notesRouter.post("/", notesController.create);
notesRouter.delete("/:id", notesController.delete);
notesRouter.get("/:id", notesController.show);
notesRouter.get("/", notesController.index);

module.exports = notesRouter;
