//look at movies-button-layout for html assistance of layout maybe(will help with classes/ids)
$(document).ready(function() {

var animals = ["cat", "bird", "rat", "dog"];
// var APIKey = "dc6zaTOxFJmzC";

$(document).on("click", ".animal", function() {
  $("#animals-here").empty();  

        var animalKind = $(this).attr("data-value");
        console.log(this);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalKind + "&api_key=dc6zaTOxFJmzC&limit=10&rating=";

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
              gif.addClass("still");
              gif.attr("src", animalResult[i].images.original_still.url);
              //moving image is this but images.original.url
              animalDiv.append(p);
              animalDiv.append(gif);
              $("#animals-here").append(animalDiv);
              
              $("button").on("click", function(){
                if (gif === $(".still")) {
                    gif.addClass("move");
                    gif.attr("src", animalResult[i].images.original.url);
                    animalDiv.append(gif);
                }

              });
              
            }
          }
          // $("#animalsGif").html(JSON.stringify(response));
          renderButtons();
        });
      
});

function renderButtons(){
    $("#animals-view").empty();
  
   for (var i = 0; i < animals.length; i++) {
          var a = $("<button>");
          a.addClass("animal");
          a.attr("data-value", animals[i]);//is it really adding this to every button? how to access it later
          a.text(animals[i]);
          $("#animals-view").append(a); 
        }
      }

$("#add-animal").on("click", function(event) {

  event.preventDefault();
  var userInput = $("#animal-input").val().trim();
    animals.push(userInput);

  renderButtons();
});

  


    renderButtons();

});
