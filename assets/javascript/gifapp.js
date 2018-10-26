$(document).ready(function () {

    var animals = ["Dog", "Cat", "Monkey", "Lion", "rabbits", "Bear", "Butterfly", "Camel", "Caribou", "Caterpillar",];

    var queryURL;


    // Function for displaying animal data
    function renderButtons() {
        $("#buttons-view").empty();
        //$("#button").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
            // Then dynamicaly generating buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
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
            name + "&limit=" + number +"&api_key=RumrJjenzOfiB6hX0ZVnkPH9EXBJ3h0A";

        return url;
    }

    function dispalyGifi() {
        var animalname = $(this).attr("data-name");
        var limit = 10;
        var queryURL = createAPIURL(animalname, limit);

        console.log(animalname);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            //Log response data object
            console.log(results);
            //empty the 
            $("#gifs-appear-here").empty();

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("item");
                gifDiv.addClass("col-sm-3");

                var rating = results[i].rating;
                var dataOriginal = results[i].images.fixed_height_still.url;
                var dataAnimate = results[i].images.fixed_height.url;
                console.log(dataAnimate);

                var p = $("<p>").text("Rating: " + rating);

                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.addClass("gif");
                animalImage.attr("data-state", "animate");
                animalImage.attr("data-original", dataOriginal);
                animalImage.attr("data-animation", dataAnimate);
                //$("#photo").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');


                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
    }//End displayGifi

    //Adding code for Pausing gifi
    function pausingGifi() {
        // Use the .attr() method for this.
        var state = $(this).attr("data-state");
        console.log("Image selected   " + state);

        

        var imageStateStill = $(this).attr("data-original");
        var imageStateanimate = $(this).attr("data-animation");


        // STEP THREE: Check if the variable state is equal to 'still',
        // then update the src attribute of this image to it's data-animate value,
        // and update the data-state attribute to 'animate'.

        // If state is equal to 'animate', then update the src attribute of this
        // image to it's data-still value and update the data-state attribute to 'still'
        // ============== FILL IN CODE HERE FOR STEP THREE =========================
        if (state == "still") {
            console.log(state);
            $(this).attr("src",imageStateanimate );
            console.log(imageStateanimate);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", imageStateStill);
            $(this).attr("data-state", "still");
        } else {
            alert("EROR!!!");
        }

    }//End pausingGifi

    // $(".gif").on("click", function () {
    //     // STEP ONE: study the html above.
    //     // Look at all the data attributes.
    //     // Run the file in the browser. Look at the images.

    //     // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

    //     // STEP TWO: make a variable named state and then store the image's data-state into it.
    //     // Use the .attr() method for this.
    //     var state = $(this).attr("data-state");
    //     console.log("Imgae selected   " + state);

    //     var imageStateStill = $(this).attr("data-still");
    //     var imageStateanimate = $(this).attr("data-animate");
    //     // ============== FILL IN CODE HERE FOR STEP TWO =========================

    //     // CODE GOES HERE

    //     // =============================================

    //     // STEP THREE: Check if the variable state is equal to 'still',
    //     // then update the src attribute of this image to it's data-animate value,
    //     // and update the data-state attribute to 'animate'.

    //     // If state is equal to 'animate', then update the src attribute of this
    //     // image to it's data-still value and update the data-state attribute to 'still'
    //     // ============== FILL IN CODE HERE FOR STEP THREE =========================
    //     if (state == "still") {
    //         console.log(state);
    //         $(this).attr("src", imageStateanimate);
    //         console.log(imageStateanimate);
    //         $(this).attr("data-state", "animate");

    //     } else if (state == "animate") {
    //         $(this).attr("src", imageStateStill);
    //         $(this).attr("data-state", "still");
    //     } else {
    //         $(this).attr("src", imageStateStill);
    //         $(this).attr("data-state", "still");
    //     }

    // CODE GOES HERE

    // ==============================================

    // STEP FOUR: open the file in the browser and click on the images.
    // Then click again to pause.
//});
//End function
// Generic function for displaying the movieInfo
$(document).on("click", ".animal", dispalyGifi);

//Calling function for pausing gifi
$(document).on("click", ".gif", pausingGifi);

// Function for displaying the animal info
// We're adding a click event listener to all elements with the class "animal"
// We're adding the event listener to the document itself because it will
// work for dynamically generated elements
// $(".animals").on("click") will only add listeners to elements that are on the page at that time
//$(document).on("click", ".animal", alertanimalName);

// Calling the renderButtons function to display the intial buttons
renderButtons();
})