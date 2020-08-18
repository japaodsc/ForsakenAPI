const express = require('express');
const port = 14100;
const server = express();
const cdata = require('./modules/getcdata');
const path = require('path');

server.get("/api/moh/data", (req, res) => {
    cdata()
    .then(data => {
    res.json(data);
    });
 });
 server.get("/", (req, res) => {
     res.send("Welcome! This is JaPao's API server. For more infomation, please contact me at https://facebook.com/japeooo. Love <3")
 })
server.get('*', function(req, res) {
     res.redirect('/');
 });
 server.listen(port, '0.0.0.0', () => {
     console.log("RESTful API Server by JaPao. Server is now running at " + port)
 });
