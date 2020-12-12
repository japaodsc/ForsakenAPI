const express = require('express');
const port = 2096;
const fs = require('fs')
const path = require('path');
const cdata = require('./modules/getcdata');
const election = require('./modules/election');
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
     let date = now.toLocaleDateString();
     cdata()
     .then(cdata =>{
         res.send(cdata)
     })
     console.log("CDATA Request From: " + req.headers['host'] + " - UserAgents: " + req.headers['user-agent'] + " -  Time: " + time + " " + date)
 });
 fastify.get("/election/data", async (req, res) => {
  let now = new Date();
  let time = now.toLocaleTimeString();
  election()
  .then(election =>{
      res.send(election)
  })
  console.log("2020 USA ELECTION Request From: " + req.ip + " Time: " + time)
});
 fastify.get("/", (req, res) => {
     res.sendFile('index.html')
 })
 //sao no deo chiu commit
 fastify.get("/chanh", (req, res) => {
  res.send("iu iu <3")
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
    console.log(`JaPao API Endpoint is now running at port ${fastify.server.address().port}`)

  })
