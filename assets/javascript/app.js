// research gif api
// create api query url variable
// create a variable 'topics' that includes an array of strings
// create buttons for all topics (probably use a for loop)
// when user clicks button, display 10 static, non-animated gif images
// when user clicks gif image, the image animates
// when user clicks gif image again, the image is static
// under each gif, display the gif rating
// when user clicks 'submit' under form, create a new button with the value of the form input
// consider changing value to lowercase to keep consistent
// rejoice in making an api website all by yourself

// array of topics 
var topic = ["puppy", "kitten", "koala", "penguin", "hedgehog", "piglet"]

// giphy api url
// var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=FiWNirzIJ7fzTeTf89RrLK6Tmp4aosFw"

// create a button for each item in topic array
function createButton() {
    for (var i = 0; i < topic.length; i++) {
        var button = $("<button>");
        button.attr("class", "giphyBtn btn btn-warning ml-2 mt-2 mb-2");
        button.attr("data-topic", topic[i]);
        button.text(topic[i]);
        $(".buttons").append(button);
    }
}

// create a new button from filling out a form
$("#submit-button").on("click", function () {
    event.preventDefault();
    var userInput = $("#form-input").val();
    var newButton = $("<button>");
    newButton.attr("class", "giphyBtn btn btn-warning ml-2 mt-2 mb-2");
    newButton.attr("data-topic", userInput);
    newButton.text(userInput).appendTo(".buttons");
    return false;

})

// calls the giphy api and displays 10 gifs on the screen depending on which topic button is pressed. image is loaded as still.
$(document).on("click", ".giphyBtn", function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-topic") + "&api_key=FiWNirzIJ7fzTeTf89RrLK6Tmp4aosFw&limit=10"
    $(".gifs").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            
            var rating = response.data[i].rating;
            var imgDiv = $("<div>");
            var img = $("<img>");
            var p = $("<p>");
            var favoriteButton = $("<button>");
            favoriteButton.addClass("favorite-button btn btn-warning");
            favoriteButton.attr("data-still", response.data[i].images.original_still.url);
            favoriteButton.attr("data-animate", response.data[i].images.original.url);
            favoriteButton.text("Favorite");
            imgDiv.addClass("img-div")
            p.addClass("rating");
            p.attr("src", rating);
            img.attr("class", "animateImage")
            img.attr("src", response.data[i].images.original_still.url)
            img.attr("data-animate", response.data[i].images.original.url);
            img.attr("data-still", response.data[i].images.original_still.url);
            img.attr("data-status", "still");
            img.attr("data-status", "animate");
            imgDiv.prepend(favoriteButton);
            imgDiv.prepend("Rating: " + rating);
            imgDiv.prepend(img);
            // $(".gifs").prepend("Rating: " + rating);
            $(".gifs").prepend(imgDiv);

        }

        //animates the image when clicked
        $(document).on("click", ".animateImage", function () {
            var status = $(this).attr("data-status");
            if (status === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-status", "animate");
            }
            // pauses the image when clicked
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-status", "still");
            }

        })

        $(".favorite-button").on("click", function (event) {
            console.dir(event.target);
            var favorite = $("<img>").attr("src", $(this).attr("data-still"))
            favorite.addClass("animateImage");
            favorite.attr("data-status", "still");
            favorite.attr("data-status", "animate");
            favorite.attr("data-animate", $(this).attr("data-animate"));
            favorite.attr("data-still", $(this).attr("data-still"));
            var favDiv = $("<div>");
            favDiv.append(favorite);
            $(".favorites").prepend(favDiv);

            //check to see if something is stored in favorites
            //if not, setItem
            // if yes, push item to array

            var favoriteArray = JSON.parse(localStorage.getItem("favorites"));
            if (favoriteArray) {
                console.log(favoriteArray);
                favoriteArray.push(event.target.dataset);
                localStorage.setItem("favorites", JSON.stringify(favoriteArray));
            }

            else {
                favoriteArray = [event.target.dataset];
                localStorage.setItem("favorites", JSON.stringify(favoriteArray));
            }
            // localStorage.setItem("favorites", JSON.stringify(event.target.dataset));


        })

    });

})

$(document).ready(function(){
    console.log(JSON.parse(localStorage.getItem("favorites")));
    var data = JSON.parse(localStorage.getItem("favorites"));
    for (var i = 0; i < data.length; i++) {
        var favorite = $("<img>").attr("src", data[i].still);
        favorite.attr("class", "animateImage favoriteImage") 
        favorite.attr("data-still", data[i].still);
        favorite.attr("data-animate", data[i].animate);
        favorite.attr("data-status", "animate");
        favorite.attr("data-status", "still");
        $(".favorites").append(favorite);
    }

    // var favorite = $("<img>").attr("src", data.still);
    


// $(".favorites").text(localStorage.getItem("favorites"))
});

createButton();

