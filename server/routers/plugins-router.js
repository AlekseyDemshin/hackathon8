var pluginsRouter = require('express').Router();
const fs = require('fs-extra');
const path = require('path');
const root = path.join(__dirname, '..');
const outputDir = path.join(__dirname, '..', 'output')

pluginsRouter.post('/:template', function (req, res) {
    var code = req.body.code;
    var template = req.params.template

    if (isValidTemplate(template)) {
        copyToOutput(template)
        replace(template, code)
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

// Error handler
pluginsRouter.use(function (err, req, res, next) {
    if (err) {
        res.status(500).send(err);
    }
});

function isValidTemplate(template) {
    return template == 'icon-set' || template == 'iframe'
}

function copyToOutput(template) {
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    const srcDir = `${root}/plugin-templates/${template}`;
    const destDir = `${outputDir}/${template}`;

    try {
        fs.emptyDirSync(outputDir)
        fs.copySync(srcDir, destDir, { recursive: true })
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

function replace(template, code) {
    const file = `${outputDir}/${template}/js/content.js`;
    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/\/\/ ###code place###/g, code);
      
        fs.writeFile(file, result, 'utf8', function (err) {
           if (err) return console.log(err);
        });
      });
}

module.exports = pluginsRouter;