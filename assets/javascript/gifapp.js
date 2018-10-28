$(document).ready(function () {

    //topic - animal gifs
    var animals = ["Dog", "Cat", "Monkey", "Lion", "rabbits", "Bear", "Butterfly", "Camel", "Caribou", "Caterpillar",];

    var queryURL;
    
    // Function for displaying animal data
    function renderButtons() {
        $("#buttons-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
            // Then dynamicaly generating buttons for each animal in the array
            var a = $("<button>");
            // Adding a class
            a.addClass("animal");
            // Added a data-attribute
            a.attr("data-name", animals[i]);
            // Provided the initial button text
            a.text(animals[i]);
            // Added the button to the HTML
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The animal from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
    });

    function createAPIURL(name, number) {
        var url = "https://api.giphy.com/v1/gifs/search?q=" +
            name + "&limit=" + number + "&api_key=RumrJjenzOfiB6hX0ZVnkPH9EXBJ3h0A";

        return url;
    }

    function giphyResponse(results) {
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("item");
            gifDiv.addClass("col-sm-3");

            //Gif Details - Rating title, tags
            var rating = results[i].rating;
            var title = results[i].title;

            var dataOriginal = results[i].images.fixed_height_still.url;
            var dataAnimate = results[i].images.fixed_height.url;
            console.log(dataAnimate);

            var p = $("<p>").text("Rating: " + rating);
            var p1 = $("<p>").text(" Title: " + title);

            var animalImage = $("<img>");
            // animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.addClass("gif");
            animalImage.attr("data-state", "still");
            animalImage.attr("data-original", dataOriginal);
            animalImage.attr("data-animation", dataAnimate);

            gifDiv.prepend(p);
            gifDiv.prepend(p1);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }
    }

    function dispalyGifi() {
        var animalname = $(this).attr("data-name");
        var limit = 10; //10 images for display
        var queryURL = createAPIURL(animalname, limit);

        console.log(animalname);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            //Log response data object
            console.log(results);
            //empty the images
            $("#gifs-appear-here").empty();
            $("#add-more-gifi").empty();
            giphyResponse(results);

            var moreGifs = $("<button>");
            moreGifs.attr("data-name", animalname);
            moreGifs.addClass("addmore");
            moreGifs.text("Add More");
            $("#add-more-gifi").append(moreGifs);
        });
    }//End displayGifi

    //Function for adding more Giphy's
    function AddMoreGiphy() {
        var animalname = $(this).attr("data-name");
        var limit = 10; //10 images for display
        var queryURL = createAPIURL(animalname, limit);

        console.log(animalname);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            //Log response data object
            console.log(results);
            //empty the images
            $("#add-more-gifi").empty();
            giphyResponse(results);

            //Adding Button for more Giphy
            var moreGifs = $("<button>");
            moreGifs.attr("data-name", animalname);
            moreGifs.addClass("addmore");
            moreGifs.text("Add More");
            $("#add-more-gifi").append(moreGifs);

        });

    }//End AddMoreGiphy

    //Adding code for Pausing gifi
    function pausingGifi() {

        var state = $(this).attr("data-state");
        console.log("Image selected   " + state);

        var imageStateStill = $(this).attr("data-original");
        var imageStateanimate = $(this).attr("data-animation");

        if (state == "still") {
            console.log(state);
            $(this).attr("src", imageStateanimate);
            console.log(imageStateanimate);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", imageStateStill);
            $(this).attr("data-state", "still");
        } else {
            alert("EROR!!!");
        }

    }//End pausingGifi

    // Generic function for displaying the movieInfo
    $(document).on("click", ".animal", dispalyGifi);

    //Calling function for pausing gifi
    $(document).on("click", ".gif", pausingGifi);

    //Add more 10 gifi on User's Request
    $(document).on("click", ".addmore", AddMoreGiphy);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
})