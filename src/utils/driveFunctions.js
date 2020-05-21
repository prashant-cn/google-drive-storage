const { google } = require('googleapis');
const stream = require('stream');

const uploadFile = (auth, req, res) => {
    console.log(req.file)
    return new Promise((resolve, reject) => {
        let fileObject = req.file;
        let bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);
        google.drive({ version: 'v3', auth })
            .files.create({
                media: {
                    mimeType: req.file.mimetype,
                    body: bufferStream
                },
                resource: {
                    name: req.file.originalname,
                    // if you want to store the file in the root, remove this parents
                    parents: ['1Tg4G5Un33jfbU1ZvwFkbh7x8bzP4xGur']
                },
                fields: 'id',
            }).then((resp) => {
                //console.log(resp,'resp');
                res.send('File uploaded');
                console.log(req.file.originalname)
                console.log(`https://www.drive.google.com/uc?id=${resp.data.id}&export=view`);
                resolve(resp.data.id)
            }).catch((error) => {
                console.log(error);
                res.send('Upload Error');
                reject(error)
            })
    })
}

module.exports = {
    uploadFile
}
