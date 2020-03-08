/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

function setActual(id) {
  console.log("me llamaron");
  console.log(id);

  idActual = id;
}

function rate() {
  let ratings = restaurantActual.reviews;
  let rating = Number(document.getElementById("ratingValue").value);
  let comment = document.getElementById("comment").value;
  let n = ratings.length();
  let newRating = (n * Number(restaurantActual.rating) + rating) / (n + 1);
  ratings.push(comment);
  var body = JSON.stringify({
    rating: newRating,
    reviews: ratings
  });
  updateRest(body, id);
}
function updateRest(restaurant, id) {
  fetch("./restaurant/" + id, {
    method: "PUT", // or 'PUT'
    body: restaurant, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => {
      console.log("Success:", response);
      renderStars(restaurant.rating);
    });
}
