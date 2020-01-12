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
var topic = ["dog", "kitten", "fish", "elephant", "hedgehog", "pig"]

// giphy api url
// var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=FiWNirzIJ7fzTeTf89RrLK6Tmp4aosFw"

// create a button for each item in topic array
function createButton() {
    for (var i = 0; i < topic.length; i++) {
        var button = $("<button>");
        button.attr("class", "giphyBtn btn btn-warning ml-2");
        button.attr("data-topic", topic[i]);
        button.text(topic[i]);
        $(".buttons").append(button);
    }
}

$(document).on("click", ".giphyBtn", function() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-topic") + "&api_key=FiWNirzIJ7fzTeTf89RrLK6Tmp4aosFw&limit=10"
    $(".gifs").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var img = $("<img>");
            img.attr("class", "animateImage")
            img.attr("src",response.data[i].images.original_still.url)
            img.attr("data-animate", response.data[i].images.original.url);
            img.attr("data-still",response.data[i].images.original_still.url);
            img.attr("data-status", "still");
            img.attr("data-status", "animate");
            $(".gifs").prepend(img);

        }
        $(".animateImage").on("click", function(){
            var status = $(this).attr("data-status");
            if (status === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-status", "animate");
            }

            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-status", "still");
            }

        })

    })
} )

createButton();

