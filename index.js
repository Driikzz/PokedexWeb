const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;

dbo.connectToServer();

//GET pokemon
app.get("/pokemon/list", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("pokemon")
        .find({})
        .toArray(function (err, result) {
        if (err) {
            res.status(400).send("Error fetching pokemons!");
        } else {
            res.json(result);
        }
        });
});

//GET pokedex 
app.get("/pokedexUser/list", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("pokedex")
        .find({})
        .toArray(function (err, result) {
        if (err) {
            res.status(400).send("Error fetching pokemons!");
        } else {
            res.json(result);
        }
        });
});

const bodyParser = require('body-parser');
const { set } = require("express/lib/application");

app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();

//DELETE pokemon
app.delete('/pokemon/delete',jsonParser,(req,res) =>{
    const body = req.body;
    const dbConnect = dbo.getDb();
    dbConnect.collection('pokemon').deleteOne({...body});
    console.log('Delete:', body);
    res.json(body);
});
//UPDATE pokemon
app.post('/pokemon/update', jsonParser, (req, res) => {
    const body = req.body;
    const dbConnect = dbo.getDb();
    changePokemon = {name:body.changePokemon};
    setNamePokemon = {name:body.name};
    dbConnect.collection('pokemon').updateOne(changePokemon,{$set:setNamePokemon});
    console.log('Changement de:', body);
});

//INSERT pokemon
app.post('/pokemon/insert', jsonParser, (req, res) => {
    const body = req.body;
    const dbConnect = dbo.getDb();
    dbConnect.collection('pokemon').insert({...body});
    console.log('Got body:', body);
    res.json(body);
});

//INSERT pokemon IN pokedex
app.post('/pokedex/insert', jsonParser, (req, res) => {
    const body = req.body;
    const dbConnect = dbo.getDb();
    selectPokemon = {name:body.selectPokemon};
    dbConnect.collection('pokedex').insertOne(selectPokemon);
    console.log('Pokemon capturé:', body);
});

app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});