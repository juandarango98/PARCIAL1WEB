/* eslint-disable no-console */
var express = require("express");
var router = express.Router();
var logged = false;
//En la carpeta anterior es que se encuentra el archivo
const MongoUtils = require("../db/MongoUtils.js");
const DetailUtils = require("../pages/DetailsUtils.js");

const mu = MongoUtils();
const details = DetailUtils();
//metodo que conecta el front con el back para hacer el get de las bases de datos
router.get("/db", (req, res) => {
  console.log("creando bd");
  mu.connect()
    .then(client => mu.listDb(client))
    .then(dbs => {
      let obj = dbs.databases;

      res.send(`
        ${details.generar(obj)}`);
    })
    .catch(err => console.log(err));
});
//metodo que conecta el front con el back para hacer el get de las colecciones de una base de datos

router.get("/listCols/:bd", function(req, res) {
  console.log("Backend!!");
  const bd = req.params.bd;
  //Client side rendering
  mu.connect()
    .then(client => mu.listCol(client, bd))
    //for Front side rendering send the html instead of the json file
    .then(datos => res.json(datos))
    .catch(err => console.log(err));
});
//metodo que conecta el front con el back para hacer el get de los documentos de una coleccion

router.get("/getDocuments/:bd/:col", function(req, res) {
  const bd = req.params.bd;
  const col = req.params.col;

  //Client side rendering
  mu.connect()
    .then(client => mu.getDocuments(client, bd, col))
    //for Front side rendering send the html instead of the json file
    .then(datos => res.json(datos))
    .catch(err => console.log(err));
});
//metodo que conecta el front con el back para hacer el post de un documento
router.post("/document/:bd/:col", function(req, res) {
  console.log("Backend!!");
  console.log("Llego post document al index!!");
  const bd = req.params.bd;
  const col = req.params.col;

  let body = req.body;
  //Client side rendering
  mu.connect()
    .then(client => {
      mu.addDocument(client, bd, col, body, user => res.json(user));
    })
    //for Front side rendering send the html instead of the json file
    .catch(err => console.log(err));
});
//metodo que conecta el front con el back para hacer el delete de un documento
router.delete("/document/:bd/:col/:id", (req, res) => {
  console.log("creando bd");
  const id = req.params.id;
  const col = req.params.col;
  const bd = req.params.bd;

  mu.connect()
    .then(client =>
      mu.deleteDocument(client, bd, col, id, user => res.json(user))
    )
    .catch(err => console.log(err));
});

//metodo que conecta el front con el back para hacer el put de un documento
router.put("/doc/:bd/:col/:id", function(req, res) {
  console.log("Backend!!");
  console.log("Llego post document al index!!");
  const bd = req.params.bd;
  const col = req.params.col;
  const id = req.params.id;

  let body = req.body;
  //Client side rendering
  mu.connect()
    .then(client => {
      mu.updateDoc(client, bd, col, body, id, user => res.json(user));
    })
    //for Front side rendering send the html instead of the json file
    .catch(err => console.log(err));
});
module.exports = router;
