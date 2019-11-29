const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Player } = require('../models/player.js');

//=> localhost:3000/players/
router.get('/', (req,res)=>{
    Player.find((err,docs)=>{
        if(!err) {res.send(docs); }
        else{ console.log('Error in retriving Players : '+ JSON.stringify(err, undefined, 2)); }
    });

});

router.get('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Player.findById(req.params.id, (err, doc) => {
        if(!err) {res.send(doc); }
        else{ console.log('Error in retriving Players : '+ JSON.stringify(err, undefined, 2));}
    });
});

//get the list of players ie Read
router.post('/', (req,res) =>{
    var pl =new Player({
        player: req.body.player,
        rank: req.body.rank,
        score: req.body.score,
        time: req.body.time,
        favourite_game: req.body.favourite_game,
        status: req.body.status,
    });
    pl.save((err,doc)=>{
        if(!err){res.send(doc); }
        else{ console.log('Error in saving Players :'+ JSON.stringify(err,undefined,2));}
    });
});

//Update
router.put('/', (req,res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var pl = {
        player: req.body.player,
        rank: req.body.rank,
        score: req.body.score,
        time: req.body.time,
        favourite_game: req.body.favourite_game,
        status: req.body.status,
    };
    Player.findByIdAnUpdate(req.params.id,{ $set: pl},{new : true},(err,doc)=>{
        if(!err){res.send(doc); }
        else{ console.log('Error in updating Player info : '+ JSON.stringify(err,undefined,2));}
    });
});

//Delete
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    Player.findByIdAndRemove(req.params.id,(err , doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in deleting Player info : '+ JSON.stringify(err,undefined,2));}
    })
})


module.exports = router;