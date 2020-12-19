const express = require("express");
const server = express();

server.listen(2020, () => {
    console.log("Web server ready.");
});

server.get("/", (req, res) => {
    res.status(200).send("");
})

