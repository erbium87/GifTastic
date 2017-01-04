$(document).ready(function() {

var animals = ["cat", "bird", "rat", "dog", "goat", "donkey", "chicken", "pig"];

$(document).on("click", ".animal", function() {
  $("#animals-here").empty();  

        var animalKind = $(this).attr("data-value");
        console.log(this);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalKind + "&api_key=dc6zaTOxFJmzC&limit=10&rating=";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          console.log(queryURL);
          console.log(response);

          var animalResult = response.data;

          for (var i = 0; i < animalResult.length; i++) {
            if (animalResult[i].rating !=="r" && animalResult[i].rating !=="pg-13") {
              var animalDiv = $("<div class='animal-Gif'>");
              var animalRating = animalResult[i].rating;
              var p = $("<p>").text("Rating: " + animalRating);
              var gif = $("<img>");

              var motionGif = animalResult[i].images.fixed_height.url;
              var stillGif = animalResult[i].images.fixed_height_still.url;

              gif.addClass("gifMotion");
              gif.attr("src", animalResult[i].images.fixed_height_still.url);
              gif.attr("data-still", stillGif);
              gif.attr("data-animate", motionGif);
              gif.attr("data-value", "still");
              
              animalDiv.append(gif);
              animalDiv.append(p);
              $("#animals-here").append(animalDiv);
              // $("#animals-here").append(gif); 
              // $("#animals-here").append(p); 
 
            }

          }
            $(".gifMotion").on("click", function(){
              var state = $(this).attr("data-value");
              console.log(this);
                if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-value", "animate");
                    // animalDiv.append(gif);
                    // $("#animals-here").append(gif);
                } else if (state === "animate")  {
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-value", "still");
                    // animalDiv.append(gif);
                    // $("#animals-here").append(gif);

                }

              });
          renderButtons();
        });
      
});

function renderButtons(){
    $("#animals-view").empty();
  
   for (var i = 0; i < animals.length; i++) {
          var a = $("<button class='btn btn-primary'>");
          a.addClass("animal");
          a.attr("data-value", animals[i]);
          a.text(animals[i]);
          $("#animals-view").append(a); 
        }
      }

$("#add-animal").on("click", function(event) {

  event.preventDefault();
  var userInput = $("#animal-input").val().trim().toLowerCase();
    animals.push(userInput);


  renderButtons();
});
  renderButtons();

});
