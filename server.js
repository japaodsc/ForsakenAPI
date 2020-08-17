const express = require('express');
const port = 2211;
const server = express();
const cdata = require('./modules/getcdata');
cdata()
.then(data => {
    console.log(data)
server.get("/moh/api/data", (req, res) => {
    res.json(data);
 });
 server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
});