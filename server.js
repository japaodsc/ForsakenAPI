const express = require('express');
const port = 14100;
const server = express();
const fastify = require('fastify')({ logger: true })
const cdata = require('./modules/getcdata');
const path = require('path');

fastify.get("/api/moh/data", (req, res) => {
    cdata()
    .then(cdata =>{
        res.send(cdata)
    })
 });
 fastify.get("/", async (req, res) => {
     res.send("Welcome! This is JaPao's API server. For more infomation, please contact me at https://facebook.com/japeooo. Love <3")
 })
fastify.get('*', function(req, res) {
     res.redirect('/');
 });
 /*server.listen(port, '0.0.0.0', () => {
     console.log("RESTful API Server by JaPao. Server is now running at " + port)
 });*/
 fastify.listen(port, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`RESTful API Server by JaPao. Server is now running at ${fastify.server.address().port}`)
  })
