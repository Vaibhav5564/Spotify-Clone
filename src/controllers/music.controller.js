const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const uploadFile = require('../services/storage.service');

async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({
                message: 'Music title is required'
            });
        }

        if (!file) {
            return res.status(400).json({
                message: 'Music file is required'
            });
        }

        const result = await uploadFile(
            file.buffer.toString('base64')
        );

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id
        });

        return res.status(201).json({
            message: 'Music Created Successfully',
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });
    } catch (error) {
        console.error('Create music error:', error);

        return res.status(500).json({
            message: 'Failed to create music',
            error: error.message
        });
    }
}

async function createAlbum(req, res) {
    try {
        const { title, musics } = req.body;

        if (!title) {
            return res.status(400).json({
                message: 'Album title is required'
            });
        }

        if (!Array.isArray(musics) || musics.length === 0) {
            return res.status(400).json({
                message: 'At least one music ID is required'
            });
        }

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics
        });

        return res.status(201).json({
            message: 'Album created successfully',
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });
    } catch (error) {
        console.error('Create album error:', error);

        return res.status(500).json({
            message: 'Failed to create album',
            error: error.message
        });
    }
}

async function getAllMusics(req, res){
    const musics = await musicModel.find().populate("artist", "userName email role")

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics
    })
}

async function getAllAlbums(req, res){
    const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "userName email");
    
    res.status(200).json({
        message: "Album fetched successfully",
        albums: albums
    })
}

module.exports = {
    createMusic,
    createAlbum,
    getAllMusics,
    getAllAlbums
};