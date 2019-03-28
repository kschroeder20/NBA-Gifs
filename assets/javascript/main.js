let topics = ['celebrate', 'anger', 'sad', 'dance', 'confused', 'fail', 'sucess'];
let queryURL = '';
let imgSource = '';
let staticGif = '';
let movingGif = '';
let staticURL = '';
let movingURL = '';
let currentURL = '';


//Create buttons
for (let i = 0; i < topics.length; i++) {
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
            staticGif = $('<img class = "gif" src = ' + staticUrl + ' data-moving =' + movingUrl + ' data-static = ' + staticUrl + ' data-state = "static" > ');

            //Create a div with the rating and the gif inside
            $('<div class = "col-3">').append(rating).append(staticGif).insertAfter('#gif-row');
        

        }
    });


};


$(document).on('click','.gif', function (){
    let state = $(this).attr('data-state');
    console.log(state);

    if (state === 'static') {
        $(this).attr('src', $(this).attr('data-moving'));
        $(this).attr('data-state', 'moving');
    } else{
        $(this).attr('src', $(this).attr('data-static'));
        $(this).attr('data-state', 'static');
    }
});

// function moveGif() {
//     $('.static-gif').hide();
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         for (let j = 0; j < 10; j++) {
//             //Set image source to the still Gif image
//             let movingImgSource = response.data[j].images.fixed_width.url;
//             //Create an image element and put the source of the still image in there
//             let movingGif = $('<img class = "moving-gif" src = ' + movingImgSource + ' > ');
//             //Create a div with the rating and the gif inside
//             $('<div class = "col-3">').append(ratingText).append(movingGif).insertAfter('#gif-row');
//         }

//     });
// };