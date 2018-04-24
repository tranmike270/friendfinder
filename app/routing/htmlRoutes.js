var router = require('express').Router();
var path = require('path');


router.get('/survey', function(req,res){
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

router.get("*" || "/home", function(req, res) {
    console.log("root");
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

module.exports = router;