require("newrelic"); // Newly added, for reporting

const request = require("request");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
var compression = require("compression");

var server = express();
server.use(compression());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "./"), { maxAge: "30 days" }));
server.use(cors());

// Albums & Player (Andy)
server.get("/artists/:artistId/albums", (req, res) => {
  req.pipe(request("http://13.57.38.215:3000" + req.url)).pipe(res);
});
// server.get("/artists/albums/:artistID", (req, res) => {
//   res.redirect("http://52.15.129.193" + req.url);
// });

// Related Artists (Sophia)
server.get("*/related-artists", (req, res) => {
  res.redirect(
    `http://34.239.128.16:3005/ra-module/${Math.floor(
      Math.random() * 1000
    )}/related-artists`
  );
});
// server.get("/artist/:id/relatedArtists", (req, res) => {
//   res.redirect("http://18.206.245.56" + req.url);
// });

// Popular Songs (Sam)
server.get("/artist/:id", (req, res) => {
  // console.log('REQUESTING SAMS SERVICE');
  res.redirect("http://13.56.254.143" + req.url);
});
// server.get("/artist/:id", (req, res) => {
//   res.redirect("http://18.224.17.253" + req.url);
// });

// Header (Lancy)
// Artist
server.get("/artists/:artistID", (req, res) => {
  res.redirect("http://54.193.126.17:3004" + req.url);
  // res.redirect("http://35.172.133.115" + req.url);
});
// Location
server.get("/locations/:artistID", (req, res) => {
  res.redirect("http://54.193.126.17:3004" + req.url);
});

server.listen(3000, console.log("Listening on:", 3000));
