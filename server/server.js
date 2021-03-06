var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var zipRouter = require("./routers/zip-router");

var app = express();
var port = 3005;
var httpPort = 3006;

app.use(morgan("dev"));
app.use(express.static("client"));

// Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,recording-session"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/zip", zipRouter);

app.listen(httpPort);

const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, app).listen(port);
console.log("Running app on port port. Visit: https://localhost:" + port + "/");
console.log("Running app on port port. Visit: http://localhost:" + httpPort + "/");
