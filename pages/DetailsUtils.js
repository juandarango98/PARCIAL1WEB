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
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    </head>
    <body>
    <select onchange = selectDB() ng-model="selectItem"  id ="selectorDB">` +
      list +
      `</select>
      <select  onchange = selectCOL() ng-model="selectItem"  id ="selectorCol">
      
      </select>
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
