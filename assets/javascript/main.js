let topics = ['celebrate', 'anger', 'sad', 'dance', 'confused', 'fail', 'sucess'];
let queryURL = ''

for (let i = 0; i < topics.length; i++){
    // $('#topic-row').append("<button>").addID;
    $('<button type="button" class = "topic btn-primary btn">').attr("id", topics[i]).text(topics[i]).appendTo('#topic-row');
}

$('.topic').on('click', function () {
    let buttonText = this.id;
    console.log(buttonText);
    queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + buttonText + '&api_key=jSLAc3r6aa2wFfIYmEQE3fsBwI0iWS2q&limit=10&rating=g';
    getGif();
})

function getGif() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Create and save a reference to new empty table row
        // var newRow = $('<tr></tr>');
        // // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
        // // Append the td elements to the new table row
        // $('tbody').append(newRow).append(
        //     $('<td></td>').text(response.Title),
        //     $('<td></td>').text(response.Year),
        //     $('<td></td>').text(response.Actors));
        console.log(response);
        for (let j = 0; j < 10; j++) {
            $('<div class= "gif">').append(response.data[j].images.original_still).appendTo("#gif-row");
        }
    });
};
