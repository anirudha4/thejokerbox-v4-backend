const { storageRef } = require('../app');
const Files = require('../models/Files');

exports.uploadFile = async (req, res) => {
    const uid = req.body.uid;
    const urls = [];
    if(req.files.file) {
        const file = req.files.file
        const filename = `${Date.now() + file.name}`
        const url = await storageRef.upload(file.tempFilePath, {
            public: true,
            destination: `uploads/${uid}/${filename}`,
            metadata: {
                firebaseStorageDownloadTokens: Date.now(),
            }
        });
        urls.push([...url, file.name])
        await Promise.all(urls.map(async url => {
            const { metadata } = url[0];
            const payload = {
                filename: url[2],
                url: metadata.mediaLink,
                id: metadata.id,
                size: metadata.size,
                createdAt: metadata.timeCreated,
                updatedAt: metadata.updated,
                contentType: metadata.contentType,
                path: url[0].name,
                uid
            }
            const file = await Files.create(payload);
            await file.save();
        }))
        return res.json({
            message: 'File Uploaded Successfully',
            urls
        })
    }
    const files = Array.from(req.files.arrayOfFiles);

    await Promise.all(files.map(async file => {
        const filename = `${Date.now() + file.name}`
        const url = await storageRef.upload(file.tempFilePath, {
            public: true,
            destination: `uploads/${uid}/${filename}`,
            metadata: {
                firebaseStorageDownloadTokens: Date.now(),
            }
        });
        urls.push([...url, file.name]);
    }));
    await Promise.all(urls.map(async url => {
        const { metadata } = url[0];
        const payload = {
            filename: url[2],
            url: metadata.mediaLink,
            id: metadata.id,
            size: metadata.size,
            createdAt: metadata.timeCreated,
            updatedAt: metadata.updated,
            contentType: metadata.contentType,
            path: url[0].name,
            uid
        }
        const file = await Files.create(payload);
        await file.save();
    }))
    res.json({
        message: 'Files Uploaded'
    })
}

exports.deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await Files.findByIdAndDelete(id);
        await storageRef.deleteFiles({
            prefix: file.path
        });
        res.json({
            success: true,
            file,
            message: 'File Deleted Successfully'
        });

    } catch(err) {
        res.json({
            message: err.message,
            success: false
        })
    }
}