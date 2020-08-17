const express = require('express');
const port = 2211;
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
 server.listen(port, () => {
    console.log(`Server is on at ${port}`);
});