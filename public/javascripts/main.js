/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
//Este metodo revisa la base de datos que el usuario ha seleccionado y llama a listCollections() para listar las colecciones correspondientes
function selectDB() {
  const yourSelect = document.getElementById("selectorDB");
  const db = yourSelect.options[yourSelect.selectedIndex].value;
  const list = document.getElementById("listDocuments");
  list.innerHTML = "";
  const div = document.getElementById("createDocDiv");
  div.innerHTML = "";
  listCollections(db);
}
//este metodo lista las colecciones correspondientes a una base de datos seleecionada
const listCollections = bd => {
  fetch("/listCols/" + bd)
    .then(res => res.json())
    .then(res => {
      var select = document.getElementById("selectorCol");
      select.innerHTML = "";
      select.setAttribute("class", "selectpicker");
      var opt = document.createElement("option");
      opt.value = "-";
      opt.innerHTML = "-";
      select.appendChild(opt);
      for (const col in res) {
        var opt = document.createElement("option");
        opt.value = res[col].name;
        opt.innerHTML = res[col].name;
        select.appendChild(opt);
      }
      select.selectedIndex = 0;
    })
    .catch(() => {
      return "error";
    });
};
//este metodo lista los documentos correspondientes a una coleccion (client side rendering)
function selectCOL() {
  const selectdb = document.getElementById("selectorDB");
  const db = selectdb.options[selectdb.selectedIndex].value;

  const yourSelect = document.getElementById("selectorCol");
  const col = yourSelect.options[yourSelect.selectedIndex].value;
  fetch("/getDocuments/" + db + "/" + col)
    .then(res => res.json())
    .then(res => {
      let keysGlobales = "";
      const list = document.getElementById("listDocuments");
      list.innerHTML = "";
      let con = 0;
      for (const mol of res) {
        const keys = Object.keys(mol);
        if (con == 0) {
          keysGlobales = keys;
        }
        con++;
        const title = document.createElement("h2");
        title.textContent = "Document:";
        const inner = document.createElement("div");
        inner.className = "property-item";
        inner.append(title);

        for (const val of keys) {
          if (val != "_id") {
            const title = document.createElement("h5");
            title.textContent = "" + val + " : " + mol[val];
            inner.append(title);
          } else {
            inner.id = mol[val];
            console.log("EN EL INNEr", mol[val], inner.id.value);
          }
        }
        let button = document.createElement("button");
        button.innerHTML = "Delete document";
        button.onclick = function() {
          deleteDoc(mol["_id"]);
        };
        let button2 = document.createElement("button");
        button2.innerHTML = "Update document";
        button2.onclick = function() {
          updateDoc(mol);
        };
        inner.append(button);
        inner.append(button2);
        list.append(inner);
      }

      const div = document.getElementById("createDocDiv");
      div.innerHTML = "";
      const inn = document.createElement("div");
      const button = document.createElement("button");
      button.innerHTML = "create a document";

      button.onclick = function() {
        createDoc(db, col, keysGlobales);
      };
      const title2 = document.createElement("h2");
      title2.textContent = "CREATE:";
      const divPost = document.createElement("div");
      divPost.id = "divPost";
      inn.append(title2);
      inn.append(button);
      inn.append(divPost);
      div.append(inn);
    })
    .catch(() => {
      return "error";
    });
}
//este metodo genera el formulario para la creacion de un nuevo documento
function createDoc(db, col, keysGlobales) {
  const div = document.getElementById("divPost");
  div.setAttribute("class", "container");
  const f = document.createElement("form");
  f.setAttribute("name", "formPost");
  f.setAttribute("id", "formPost");
  for (const val of keysGlobales) {
    if (val != "_id") {
      let j = document.createElement("div");
      j.setAttribute("class", "form-group");
      let label = document.createElement("label");
      label.setAttribute("for", val);
      label.innerHTML = val;
      let i = document.createElement("input"); //input element, text
      i.setAttribute("type", "text");
      i.setAttribute("id", val);
      i.setAttribute("name", val);
      j.append(label);
      j.append(i);
      f.appendChild(j);
    }
  }

  let b = document.createElement("button"); //input element, text
  let a = document.createElement("a"); //input element, text
  // a.setAttribute("href", "");
  b.onclick = function() {
    console.log("me espicharon");
    addDocument(keysGlobales);
  };
  b.setAttribute("id", "submitPost");
  b.innerHTML = "Create";
  let j = document.createElement("div");
  j.setAttribute("class", "form-group");
  a.append(b);
  j.append(a);

  div.append(f);
  div.append(j);
}
//este metodo, toma el formulario llenado por el usuario para la creacion de un documento, lo convierte en un json y lo envia al back par que sea persistido
function addDocument(keysGlobales) {
  const form = document.forms["formPost"];
  const selectdb = document.getElementById("selectorDB");
  const db = selectdb.options[selectdb.selectedIndex].value;
  const yourSelect = document.getElementById("selectorCol");
  const col = yourSelect.options[yourSelect.selectedIndex].value;
  let o = {};
  for (const val of keysGlobales) {
    if (val != "_id") {
      o[val] = form[val].value;
    }
  }
  let objeto = JSON.stringify(o);
  console.log(o, "OBJEC¿TOO");
  console.log(objeto);
  fetch("./document/" + db + "/" + col, {
    method: "POST", // or 'PUT'
    body: objeto, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      res.json();
      selectCOL();
    })

    .catch(error => console.error("Error:", error));
}
//este metodo elimina un documento dado un id que entra por parametro
function deleteDoc(id) {
  const selectdb = document.getElementById("selectorDB");
  const db = selectdb.options[selectdb.selectedIndex].value;

  const yourSelect = document.getElementById("selectorCol");
  const col = yourSelect.options[yourSelect.selectedIndex].value;
  fetch("/document/" + db + "/" + col + "/" + id, {
    method: "DELETE"
  })
    .then(res => {
      res.json();
      selectCOL();
    })
    .catch(() => {
      return "error";
    });
}
//este metodo genera el formulario para la edicion de un documento
function updateDoc(obj) {
  const keysGlobales = Object.keys(obj);
  const id = obj["_id"];
  console.log(id, "ID");
  const div = document.getElementById(id);
  div.innerHTML = "";
  div.setAttribute("class", "container");
  const f = document.createElement("form");
  f.setAttribute("name", "formUpdate");
  f.setAttribute("id", "formUpdate");
  for (const val of keysGlobales) {
    if (val != "_id") {
      let j = document.createElement("div");
      j.setAttribute("class", "form-group");
      let label = document.createElement("label");
      label.setAttribute("for", val);
      label.innerHTML = val;
      let i = document.createElement("input"); //input element, text
      i.setAttribute("type", "text");
      i.setAttribute("id", val);
      i.setAttribute("name", val);
      i.setAttribute("value", obj[val]);
      j.append(label);
      j.append(i);
      f.appendChild(j);
    }
  }

  let b = document.createElement("button"); //input element, text
  let a = document.createElement("a"); //input element, text
  // a.setAttribute("href", "");
  b.onclick = function() {
    console.log("me espicharon");
    updateDocument(obj);
  };
  b.setAttribute("id", "submitPost");
  b.innerHTML = "Update";
  let j = document.createElement("div");
  j.setAttribute("class", "form-group");
  a.append(b);
  j.append(a);

  div.append(f);
  div.append(j);
}
//este metodo, toma el formulario llenado por el usuario para la edicion de un documento, lo convierte en un json y lo envia al back par que sea persistido
function updateDocument(obj) {
  const keysGlobales = Object.keys(obj);
  const id = obj["_id"];
  const form = document.forms["formUpdate"];
  const selectdb = document.getElementById("selectorDB");
  const db = selectdb.options[selectdb.selectedIndex].value;
  const yourSelect = document.getElementById("selectorCol");
  const col = yourSelect.options[yourSelect.selectedIndex].value;
  let o = {};
  for (const val of keysGlobales) {
    if (val != "_id") {
      o[val] = form[val].value;
    }
  }
  let objeto = JSON.stringify(o);
  console.log(o, "OBJEC¿TOO");
  console.log(objeto);
  fetch("./doc/" + db + "/" + col + "/" + id, {
    method: "PUT", // or 'PUT'
    body: objeto, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      res.json();
      selectCOL();
    })

    .catch(error => console.error("Error:", error));
}
//metodo de inicializacion para que aparezcan las colecciones correspondientes a la base de datos seleccionada por defecto al cargar la pagina
window.onload = function exampleFunction() {
  this.selectDB();
};
