//funcion que hace el server side rendering de la lista de bases de datos
/* eslint-disable no-console */
function DetailsUtils() {
  const mu = {};

  mu.generar = databases => {
    let list = "";
    let array = databases.map(function(databases) {
      return databases.name;
    });
    let i = 0;
    for (const name in array) {
      if (array[name] != "admin" && array[name] != "local")
        if (i == 0) {
          list = list + "<option selected>" + array[name] + "</option> ";
        } else {
          list = list + "<option >" + array[name] + "</option> ";
        }
      i++;
    }
    const template =
      `
	<html>
  <head>
  <!-- required meta tags -->
  <meta charset="UTF-8" />
  <!-- code optimization for mobile devices -->
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />

  <!-- meta tag for page description and author in browser -->
  <meta name="author" content="Juan Diego Arango" />
  <meta name="description" content="Mongodb atlas manager" />

  <!-- page title -->
  <title>DB Manager</title>

  <!-- bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  <!-- custom links -->
  </head>
    <body>
    <div class = "container">
    <select class="col-md-6" select-outline" onchange = selectDB() ng-model="selectItem"  id ="selectorDB">` +
      list +
      `</select>
      <select  onchange = selectCOL() ng-model="selectItem"  id ="selectorCol">
      
      </select>
      </div>
      <div class = "container" id = "listDocuments" >

      </div>
      <div class = "container" id = "createDocDiv">
        
      </div>
      
      
      <script src="javascripts/main.js"></script>
    </body>
</html>`;
    return template;
  };
  return mu;
}
module.exports = DetailsUtils;
