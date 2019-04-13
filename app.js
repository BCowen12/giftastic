

var searchTerm = "";
var arr = ["dog", "cat", "bird", "mouse", "panther"];

//when add item is clicked a button will be created for it.
$("#add-new-button").on("click", function(e){
    event.preventDefault();
    var button = $("#new-button").val();
    arr.push(button);
    $("#button-list").html(arr.map(list));
    $("#new-button").val("");

});

//sets the buttons that are already in the array
$("#button-list").html(arr.map(list));

//when a button is clicked it will show the gifs related to that animal.
$(document).on("click", ".animal", function(){
    event.preventDefault();
    searchTerm = $(this).attr("value");
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=ZsXWMZfyusIH6Ez4N3V1vpVPtc1AuSIa&q=${searchTerm}&limit=10&offset=0&rating=G&lang=en`;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
        $("#gifs").html(response.data.map(show));
      });
});


//when an image is clicked it will animate or not that image.
$(document).on("click", ".gif", function() {
    console.log($(this).attr("data-state"));
    if($(this).attr("data-state")==="still"){
      $(this).attr("data-state", "not");
      $(this).attr("src", $(this).attr("data-animate"));
    }else{
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-still"));
    }
});

//creates buttons for the items in the array
function list(list){
    return ` <button type="button" class="btn btn-secondary animal" value="${list}">${list}</button> `;
};


//creates the HTML for the gifs to show on the screen
function show(a){
    return `<div class="rating">Rating: ${a.rating}</div>
    <img src="${a.images.original_still.url}" data-still="${a.images.original_still.url}" data-animate="${a.images.original.url}" data-state="still" class="gif"/>`;
}

    