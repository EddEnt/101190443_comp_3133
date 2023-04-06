const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/dist/101190443-comp3133-assig2"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/<app-name>/index.html"));
});

app.listen(process.env.PORT || 4200);
