let topics = ['celebrate', 'anger', 'sad', 'dance', 'confused', 'fail', 'sucess'];
let queryURL = '';
let imgSource = '';
let gif = '';

//Create buttons
for (let i = 0; i < topics.length; i++){
    $('<button type="button" class = "topic btn-primary btn">').attr("id", topics[i]).text(topics[i]).appendTo('#topic-row');
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

$('.topic').hover(moveGif);

function getGif() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //TEST
        console.log(response);
        //Display 10 gifs in a div inside the gif-row
        for (let j = 0; j < 10; j++) {
            let rating = response.data[j].rating;

            let ratingText = $('<p class = "rating">').text("Rating: " + rating);

            imgSource = response.data[j].images.fixed_width_still.url;
            gif = $('<img class = "gif" src = ' + imgSource + ' > ');

            $('<div class = "col-3">').append(ratingText).append(gif).insertAfter('#gif-row');

        }
    });
};

function moveGif() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (let h = 0; h < 10; h++) {
            if (response.data[j])
            imgSource = response.data[j].images.fixed_width_still.url;
            gif = $('<img class = "gif" src = ' + imgSource + ' > ');
            this.removeAttr('src');
            this.addAttr('src')

        }
    }
    });
};
