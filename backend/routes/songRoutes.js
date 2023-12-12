const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');


router.post('/addSongs', songController.createSong);
router.get('/getAllSong', songController.getAllSongs);
router.get('/getSingleSong/:id', songController.getSongById);
router.put('/updateSong/:id', songController.updateSong);
router.delete('/deleteSong/:id', songController.removeSong);
router.get('/statistics', songController.generateStatistics); 
router.get('/genreStats', songController.genreStats);
router.get('/artistStats', songController.artistStats);
router.get('/albumStats', songController.albumStats);

module.exports = router;