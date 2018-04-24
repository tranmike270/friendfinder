var router = require('express').Router();
var path = require('path');
var data = require('../data/friends.js')
var fs = require('fs');

router.get("/api/friends", function(req,res){

    fs.readFile(path.join(__dirname, '../data/friends.js'), function(err,data){
        if(err) throw err;
        console.log("----------------");
       
        var friends = JSON.parse(data);
        console.log(friends);
        res.json(friends);
    });
    // res.json(data);
});

router.post('/api/new', function(req,res){
    var body = req.body;

    var obj = {
        name : body.name,
        photo : body.photo,
        scores : []
    };
   for(var i = 0; i < body.scores.length; i++){
       obj.scores.push(parseInt(body.scores[i]));
   };
    console.log(obj);
    fs.readFile(path.join(__dirname, '../data/friends.js'), function(err,data){
        if(err) throw err;
        console.log("----------------");
        var currentFriends = JSON.parse(data);
        var friends = JSON.parse(data);
        console.log(friends);
        friends.push(obj);
        console.log(friends);
        fs.writeFile(path.join(__dirname, '../data/friends.js'), JSON.stringify(friends, null, 2), function(err){
            if(err) throw err;
            console.log("Written to file");
            res.json(currentFriends);
        });
    });
});

module.exports = router;