/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let datos;
let logge;
/*fetch("./listCols")
  .then(res => res.json())
  .then(render)
  .catch(() => {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.textContent = "Error downloading data";
    document.getElementById("target").append(div);
  });
  */

function selectDB() {
  const yourSelect = document.getElementById("selectorDB");
  const db = yourSelect.options[yourSelect.selectedIndex].value;
  listCollections(db);
}

const listCollections = bd => {
  fetch("/listCols/" + bd)
    .then(res => res.json())
    .then(res => {
      var select = document.getElementById("selectorCol");
      select.innerHTML = "";
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
function selectCOL() {
  const selectdb = document.getElementById("selectorDB");
  const db = selectdb.options[selectdb.selectedIndex].value;

  const yourSelect = document.getElementById("selectorCol");
  const col = yourSelect.options[yourSelect.selectedIndex].value;
  fetch("/getDocuments/" + db + "/" + col)
    .then(res => res.json())
    .then(res => {
      let keysGlobales = "";
      var list = document.getElementById("listDocuments");
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
          const title = document.createElement("h5");
          title.textContent = "" + val + " : " + mol[val];
          inner.append(title);
        }

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

window.onload = function exampleFunction() {
  this.selectDB();
};
