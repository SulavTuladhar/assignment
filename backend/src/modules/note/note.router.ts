var router = require('express').Router();

const noteController = require('./note.controller');

router.route('/')
    .get(noteController.fetchAllNotes)
    .post(noteController.createNote)

router.route('/:id')
    .get(noteController.fetchNote)
    .put(noteController.updateNote)
    .delete(noteController.deleteNote)
router.route('/search')
    .post(noteController.searchNote)
module.exports = router;