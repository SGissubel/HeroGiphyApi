$(document).ready(function(){

	var topics = ["Superman", "Batman", "Spiderman", "Wolverine", "Captain America", "The Hulk", "The Flash", "Aquaman"];

	
	//generating gifs
	function displayGif(){



		var hero = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10"


		$.ajax({
			url: queryURL,
			method: "GET"

		}).done(function(response){
			var results = response.data;
			for (var j = 0; j < results.length; j++) {
				var div = $("<div>").addClass('images');
				var rated = results[j].rating;
				var gifAnimated = results[j].images.fixed_width.url;
	         	var gifStill = results[j].images.fixed_width_still.url;
	         	var p = $('<p>').text('Rating: ' + rated);
	         	var gifs = $('<img>').addClass('gif').attr('src', gifStill).attr('data-still', gifStill).attr('data-animate', gifAnimated).attr("data-state", 'still');

	         	div.append(p);
	         	div.append(gifs);
	         	$('#hero-gifs').prepend(div);
	         }//end for loop

	         //gif click to change still to animate
	         $('.gif').on('click', function(){
	         	var state = $(this).attr("data-state");
	         	
	         	if(state === 'still') {
	         		$(this).attr("src", $(this).data("animate"));
	         		$(this).attr("data-state", "animate");
	         	} else {
	         		$(this).attr("src", $(this).data("still"));
	         		$(this).attr("data-state", "still");
	         	}
	         });//end gif onclick.
	});//end done function response
		


	}//end display gif

	function createGif(){
			$('#buttons').html("");

			for (var i = 0; i < topics.length; i++) {
			var a = $('<button>').addClass('btn').attr("data-name", topics[i]).text(topics[i]);
			$('#buttons').append(a);

		}//end for loop
	}//ends create gif

	//add button function
	$('#add-hero').on("click", function(event) {
		event.preventDefault();

		var hero = $('#hero-input').val().trim();
		 topics.push(hero);

		$('#hero-input').val('');

		 createGif();
	
	//clears section after button add click
	$('.btn').on("click", function clear(){
		$('#hero-gifs').html('');
		})
	 

	})//end hero add button


$(document).on("click", ".btn", displayGif);
	

createGif();


	//clears gifs for new gifs button click
	$('.btn').on("click", function clear(){
		$('#hero-gifs').html('');
		})





});