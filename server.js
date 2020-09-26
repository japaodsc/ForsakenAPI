const express = require('express');
const port = 2096;
const fs = require('fs')
const path = require('path');
const cdata = require('./modules/getcdata');
const fastify = require('fastify')({
  logger: false,
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync(path.join(__dirname, 'resources', 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'resources', 'fullchain.pem'))
  },
});
fastify.register(require('fastify-favicon'), { path: './resources' })
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'pages')
})

fastify.get("/moh/data", async (req, res) => {
     let now = new Date();
     let time = now.toLocaleTimeString();
     /*res
     .header('Content-Type', 'application/json; charset=utf-8')
     .sendFile('cdata.json')*/
     cdata()
     .then(cdata =>{
         res.send(cdata)
     })
     console.log("CDATA Request From: " + req.ip + " Time: " + time)
 });
 fastify.get("/", (req, res) => {
     res.sendFile('index.html')
 })
 //sao no deo chiu commit
 fastify.get("/chanh", (req, res) => {
  res.send("Miss you so much.......Sorry :((((((")
})
fastify.setNotFoundHandler((req, res) => {
  res.redirect("/")
})
 fastify.listen(port, '0.0.0.0', (err) => {
    if (err) {
      fastify.log.error(err)
      console.log(err)
      process.exit(1)
    }
    console.log(`RESTful API Server by JaPao. Server is now running at ${fastify.server.address().port}`)

  })
