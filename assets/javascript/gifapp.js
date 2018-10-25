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

    function createAPIURL(name){
        var url = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=RumrJjenzOfiB6hX0ZVnkPH9EXBJ3h0A";

        return url;
    }

    $("button").on("click", function () {
        var name = $(this).attr("data-name");
        var queryURL = createAPIURL(name);

        console.log(name);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    });

    // Function for displaying the animal info
    // We're adding a click event listener to all elements with the class "animal"
    // We're adding the event listener to the document itself because it will
    // work for dynamically generated elements
    // $(".animals").on("click") will only add listeners to elements that are on the page at that time
    //$(document).on("click", ".animal", alertanimalName);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
})