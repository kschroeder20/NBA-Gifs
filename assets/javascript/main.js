let topics = ['celebrate', 'dance', 'confused', 'fail', 'win', 'Michael Jordan', 'Lebron James', 'Steph Curry'];
let queryURL = '';
let staticURL = '';
let movingURL = '';


//Create buttons
generateButtons();

function generateButtons() {
    //Empty button row
    $("#topic-row").empty();
    //Generate buttons based on the topics in the topics array
    for (let i = 0; i < topics.length; i++) {
        $('<button type="button" class="topic btn-success btn">')
            //Add attributes to the buttons in case we want to access later
            .attr("id", topics[i])
            .attr("data-name", topics[i])
            //Have but button say the topic
            .text(topics[i])
            .appendTo('#topic-row');
    }
    $('.topic').on('click', function () {
        //Empty from last selection
        $("#gif-row").empty();
        //Grab ID from button pressed
        let buttonText = this.id;
        //Remove any spaces in word and replace with '+' sign
        let queryWord = buttonText.replace(" ", '+');
        //TEST
        console.log(queryWord);
        //Create URL for giphy API
        queryURL = 'http://api.giphy.com/v1/gifs/search?q=NBA+' + queryWord + '&api_key=jSLAc3r6aa2wFfIYmEQE3fsBwI0iWS2q&limit=10';
        //Get the Gif function
        getGif();
    })
};

//When the user has submitted at topic in the form input, create a new button 
$('#submit-button').on('click', function () {
    event.preventDefault();
    //Get the value of what the user typed
    let newTopic = $('#input-text').val();
    //If there is something in the search bar, run the generateButtons functions,
    //which will empty the current buttons and rerun with the new element in array
    if (newTopic !== "") {
        topics.push(newTopic);
        generateButtons();
    }
});

function getGif() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //TEST
        console.log(response);
        //Display 10 gifs in a div inside the gif-row
        for (let j = 0; j < 10; j++) {
            //Get rating for image
            //Make a paragraph with the correct rating
            let rating = $('<p class = "rating">').text("Rating: " + response.data[j].rating);

            //Set image source to the still Gif image
            staticUrl = response.data[j].images.fixed_width_still.url;
            movingUrl = response.data[j].images.fixed_width.url;

            //Create an image element and put the source of the still image in there
            staticGif = $('<img class = "gif" src = ' + staticUrl +
                ' data-moving =' + movingUrl +
                ' data-static = ' + staticUrl +
                ' data-state = "static" > ');

            //Create a div with the rating and the gif inside
            $('<div class = "col-lg-3 col-md-4 col-sm-6 col-xs-12">')
                .append(rating)
                .append(staticGif)
                .insertAfter('#gif-row');
        }
    });
};

//When someone clicks a Gif, make it move
$(document).on('click', '.gif', function () {
    //Grab the data state from the Gif clicked an put in variable
    let state = $(this).attr('data-state');
    //TEST
    console.log(state);
    //If the state is static, change the source of image to what is currently in the
    //data-moving attribute of the Gif and vice versa
    if (state === 'static') {
        $(this).attr('src', $(this).attr('data-moving'));
        $(this).attr('data-state', 'moving');
    } else {
        $(this).attr('src', $(this).attr('data-static'));
        $(this).attr('data-state', 'static');
    }
});