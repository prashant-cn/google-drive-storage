const { google } = require('googleapis');
const stream = require('stream');

const uploadFile = (auth, req, res) => {
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
                    // if you want to store the file in the root, remove the parents
                    parents: ['1DHatezQFlAFCZlhOmsYpLkymA3JC9MEq'] // change this ID as per the Gmail Account in use.
                },
                fields: 'id',
            }).then((resp) => {
                //res.send('File uploaded');
                //console.log(`https://www.drive.google.com/uc?id=${resp.data.id}&export=view`);
                resolve(resp.data.id)
            }).catch((error) => {
                //res.send('Upload Error');
                reject(error)
            })
    })
}

module.exports = {
    uploadFile
}
