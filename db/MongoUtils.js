/* eslint-disable no-console */
//funciones que conectan la aplicacion con la base de datos para poder hacer las operaciones CRUD
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const uri = process.env.MONGOLAB_URI;
function MongoUtils() {
  const mu = {};

  mu.connect = () => {
    // const uri =
    //   "mongodb+srv://chicho:123@cluster0-6emja.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    console.log("Connecting");
    //retorna una promesa
    return client.connect();
  };
  mu.listDb = client => {
    // Connection url

    const db = client.db();

    return db
      .admin()
      .listDatabases()
      .finally(() => client.close());
  };
  mu.listCol = (client, bd) => {
    // Connection url

    const db = client.db(bd);
    return db
      .listCollections()
      .toArray()
      .finally(() => client.close());
  };
  mu.getDocuments = (client, db, col) => {
    col = "" + col;
    const collectionRestaurant = client.db(db).collection(col);
    console.log("Getting documents");
    //retorna una promesa
    return collectionRestaurant
      .find()
      .sort({ _id: -1 })
      .limit(50)
      .toArray()
      .finally(() => {
        console.log("closing client");
        client.close();
      });
  };

  mu.deleteDocument = (client, db, col, id, callback) => {
    col = "" + col;
    const collection = client.db(db).collection(col);
    console.log("Getting documents");
    let resp = collection.deleteOne({ _id: ObjectId(id) }, function(err, res) {
      if (err) throw err;
      console.log("1 document deleted");
      client.close();
      callback(res);
    });
    //retorna una promesa
  };

  mu.addDocument = (client, db, col, body, callback) => {
    console.log(body, "BODY");

    const cole = client.db(db).collection(col);
    console.log(body);
    let resp = cole.insertOne(body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
      callback("OK");
    });
  };

  mu.updateDoc = (client, bd, col, body, id, callback) => {
    con = "" + col;
    const cole = client.db(bd).collection(col);
    console.log(body);

    console.log(id, col, bd);
    let resp = cole.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: body },
      function(err, res) {
        console.log(id, col, bd);
        if (err) throw err;
        console.log("1 document updated");
        client.close();
      }
    );
    console.log(resp);
    callback("OK");
  };

  return mu;
}

module.exports = MongoUtils;
