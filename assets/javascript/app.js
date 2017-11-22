$(document).ready(function() {

    var topics = [];


    // Giphy AJAX call where we are limiting our results to 15 items and the value of "q" is our user selected search term.

    function showMeChefs() {

        var search = $(this).data("search");
        console.log(search);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=jB1nUYoqX1aXEV7r0csCvOBPVYywrG7r&limit=15";

        console.log(queryURL);


        // AJAX call, when finished (.done) it will go ahead and create a div for each result. 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var showDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                showImage.attr("src", staticSrc);
                showImage.addClass("newChefGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#giphZone").prepend(showDiv);

            }
        });
    }

    // submit button on-click function that produces a new item in the topics array and makes a button. 
    $("#addChef").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#chefInput").val().trim();
        topics.push(newShow);
        console.log(topics);
        $("#chefInput").val('');
        buildButtons();
    });

    // user searches are pushed into new buttons with this function 
    function buildButtons() {
        $("#theButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary" align="center">');
            a.attr("id", "chef");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#theButtons").append(a);
        }
    }


    buildButtons();
    // when a chef button is clicked it will display corresponding gifs on the page
    $(document).on("click", "#chef", showMeChefs);

    //click event that will trigger the play/pause function "playAction"
    $(document).on("click", ".newChefGiphy", playAction);

    //a function to pause and play gifs using their data-state
    function playAction() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});