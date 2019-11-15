const express = require("express");

const App = express();

App.get("/", (req, res) => res.send("<h1>Animatrix-Server</h1>"));

App.listen(5000, () => console.log("Server started on  port 50000"));
