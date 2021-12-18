const { storageRef } = require('../app');
const { uploadFile, deleteFile } = require('../controllers/filesController');
const Files = require('../models/Files');

// requires
const router = require('express').Router();

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const files = await Files.find({ uid });
    res.json({
        files,
        length: files.length
    });
});

router.post('/', uploadFile);

router.delete('/:id', deleteFile);



module.exports = router;