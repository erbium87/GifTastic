//look at movies-button-layout for html assistance of layout maybe(will help with classes/ids)
$(document).ready(function() {

var animals = ["cat", "bird", "rat", "dog", "goat", "donkey", "chicken", "pig"];
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

              var motionGif = animalResult[i].images.original.url;//testing out to see if works as a variable
              var stillGif = animalResult[i].images.original_still.url;

              gif.addClass("gifMotion");
              gif.attr("src", animalResult[i].images.original_still.url);
              //this above works but seeing if variable will work
              gif.attr("data-still", stillGif);
              gif.attr("data-animate", motionGif);
              gif.attr("data-value", "still");
              // gif.attr("src", animalResult[i].images.original.url);
              //attr for motion gif
              animalDiv.append(gif);
              animalDiv.append(p);
              $("#animals-here").append(animalDiv);

              
            }

          }
            $(".gifMotion").on("click", function(){
              var state = $(this).attr("data-value");
              console.log(this);
                if (state === "still") {
                    // gif.attr("src", animalResult[i].images.original.url);
                    // gif.attr("src", motionGif);
                    $(this).attr("src", $(this).data("animate"));
                    // $(this).attr("src", motionGif);
                    // gif.attr("data-value", "motion");
                    $(this).attr("data-value", "animate");
                    animalDiv.append(gif);
                    $("#animals-here").append(gif);
                }
                else if (state === "animate")  {
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-value", "still");
                    animalDiv.append(gif);
                    $("#animals-here").append(gif);

                }

              });
          // $("#animalsGif").html(JSON.stringify(response));
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
