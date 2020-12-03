var pluginsRouter = require("express").Router();
const fs = require("fs-extra");
const path = require("path");
const formidable = require("formidable");
const root = path.join(__dirname, "..");
const outputDir = path.join(__dirname, "..", "output");

pluginsRouter.post("/:template", function (req, res) {
  console.error("bu");
  var code = req.body.code;
  var template = req.params.template;

  if (isValidTemplate(template)) {
    copyToOutput(template);
    replace(code);
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});

pluginsRouter.post("/:template/images", (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    for (const [key, file] of Object.entries(files)) {
      const fromPath = file.path;
      const imgDir = `${outputDir}/img/${file.name}`;
      const rawData = fs.readFileSync(fromPath);
      fs.writeFile(imgDir, rawData, function (err) {
        if (err) console.log(err);
      });
    }
  });
  res.status(200).send();
});

// Error handler
pluginsRouter.use(function (err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});

function isValidTemplate(template) {
  return template == "icon-set" || template == "iframe";
}

function copyToOutput(template) {
  const srcDir = `${root}/plugin-templates/${template}`;
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    fs.emptyDirSync(outputDir);
    fs.copySync(srcDir, outputDir, { recursive: true });
  } catch (err) {
    console.error(err);
  }
}

function replace(code) {
  const file = `${outputDir}/js/content.js`;
  fs.readFile(file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/\/\/ ###code place###/g, code);
    fs.writeFile(file, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}

module.exports = pluginsRouter;
