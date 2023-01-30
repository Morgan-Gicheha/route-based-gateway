
const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");
const logDirectory = path.join(__dirname, "logs");
const routes = require("./routes/routes");
const helmet = require("helmet");


fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: logDirectory,
});

// setup the logger
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
    morgan(":method :url :status :body", {
        stream: accessLogStream,
    })
);
app.use(express.json());
app.use(helmet());

app.use("/gateway", routes);

app.listen(3000, () => {
    console.log(`Example app listening on port http://127.0.0.1:${3000}`);
});
