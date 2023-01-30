const express = require("express");
const router = express.Router();
const axios = require("axios");

router.all("/", (req, res) => {
    res.send({"gateway-status":"available"})
});


router.post("/ghana", (req, res) => {
    let method = req.method;
    const options = {
        method: method,
        url: "",
        headers: { "Content-Type": "application/json" },
        data: req.body,
    };
    axios
        .request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error);
        });
});



module.exports = router;
