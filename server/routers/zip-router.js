var zipRouter = require("express").Router();
const fs = require("fs-extra");
const path = require("path");
const root = path.join(__dirname, "..");
const zipPath = `${root}/bundle.zip`;

zipRouter.get("", (req, res) => {
    try {
        var zipFile = fs.statSync(zipPath);
        res.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-Length': zipFile.size
        });
        var readStream = fs.createReadStream(zipPath);
        readStream.pipe(res);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

zipRouter.use(function (err, req, res, next) {
    if (err) {
        res.status(500).send(err);
    }
});

module.exports = zipRouter;
