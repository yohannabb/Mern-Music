const Song = require('../models/songs');

const createSong = async (req, res) => {
    try {
        const newSong = await Song.create(req.body);
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateSong = async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const removeSong = async (req, res) => {
    try {
        const song = await Song.findOneAndDelete({ _id: req.params.id });
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ message: 'Song deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Invalid Id' });
    }
};

const generateStatistics = async (req, res) => {
    try {
        const totalSongs = await Song.countDocuments(); 
        const distinctArtists = await Song.distinct('artist'); 
        const totalArtists = distinctArtists.length; 
        const distinctAlbums = await Song.distinct('album'); 
        const totalAlbums = distinctAlbums.length; 
        // Use MongoDB aggregation pipeline to count distinct genres  
        const genreStats = await Song.aggregate([ 
            { $group: { _id: '$genre', count: { $sum: 1 } } }, 
            { $group: { _id: null, totalGenres: { $sum: 1 }, genreCounts: { $push: { genre: '$_id', count: '$count' } } } }, 
            { $project: { _id: 0, totalGenres: 1, genreCounts: 1 } }
        ]);

        // Extract genreCounts from the result
        const genreCounts = genreStats[0].genreCounts;

        // Add more stats as needed
        res.send({
            totalSongs,
            totalArtists,
            totalAlbums,
            totalGenres: genreStats[0].totalGenres,
            genreCounts
        });
    } catch (error) {
        res.status(500).send(error);
    }
};


// router.get('/genre-stats', async (req, res) => {
const genreStats = async (req, res) => {
    try {
        const genreStats = await Song.aggregate([
            { $group: { _id: "$genre", count: { $sum: 1 } } }
        ]);
        res.send(genreStats);
    } catch (error) {
        res.status(500).send(error);
    }
};


const artistStats = async (req, res) => {
    try {
        const artistStats = await Song.aggregate([
            { $group: { _id: "$artist", totalSongs: { $sum: 1 }, totalAlbums: { $addToSet: "$album" } } },
            { $project: { _id: 1, totalSongs: 1, totalAlbums: { $size: "$totalAlbums" } } }
        ]);
        res.send(artistStats);
    } catch (error) {
        res.status(500).send(error);
    }
};



const albumStats = async (req, res) => {
    try {
        const albumStats = await Song.aggregate([
            { $group: { _id: "$album", count: { $sum: 1 } } }
        ]);
        res.send(albumStats);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createSong,
    getAllSongs,
    getSongById,
    updateSong,
    removeSong,
    generateStatistics,
    genreStats,
    artistStats,
    albumStats,
};

