// Declare variables.
debugger;
var keys = require("./keys.js");
var fs = require("fs");
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var params = {screen_name: 'Diaz_97NY'};
var app = process.argv[2];
var input = process.argv[3];

switch(app){
  case 'my-tweets':
    tweets();
    break;
  case 'spotify-this-song':
    spotifySong();
    break;  
  case 'movie-this':
    movie();
    break;
  case 'do-what-it-says':
    doWhat();    
}



function spotifySong(){ 

spotify.search({ type: 'track', query: input}, function(err, songs) {
 
  //   console.log("look here!" + input);
  // }
  if (!err ) 
    {
        if (input === undefined)
          {input = "what's my age again";
          }
          else 
          {input = process.argv[3];
          }
    // {console.log('Error occurred: ' + err);
    //     return;
    // } 
    // Do something with 'data' 
    var songData= songs.tracks.items;
    // console.log(songData);
    songData.forEach(function(songData){
      console.log("Artist: " + songData.artists[0].name);
      console.log("Album: " + songData.album.name);
      console.log("Track: " + songData.name);
      console.log("url: " + songData.preview_url); 
      console.log("\n");
      });
    }
  });
}
  //   for (var i=0; i < data.tracks.items.length; i ++){
  //   console.log(data.tracks.items[i].artists[0].name);
  // }


function movie(){
    if (input === undefined)
    {input = "Mr. Nobody";
    }
  else 
    {input = process.argv[3];
    }
request("http://omdbapi.com/?plot=short&tomatoes=true&t=" + input,  function (error, response, body) {
  if (error && response.statusCode != 200) 
    {console.log("Error occured: " + error);
    return; 
    }
    var info = JSON.parse(body);
    // console.log(info);
    console.log();
    console.log("Title: " + info.Title);
    console.log("Year: " + info.Year);
    console.log("IMDB Rating: " + info.imdbRating);
    console.log("Country: " + info.Country);
    console.log("Language: " + info.Language);
    console.log("Plot: " + info.Plot);
    console.log("Actors: " + info.Actors);
    console.log("Rotten Tomatoes Rating: " + info.tomatoRating);
    console.log("Rotten Tomatoes URL: " + info.tomatoURL);
    console.log();
  });
};


function tweets() {
// var params = {screen_name: 'nodejs'};
var client = new Twitter(
  keys.twitterKeys
);
client.get('statuses/user_timeline', params, function(error, tweets, response){
  // if (!error) {
  //   console.log(tweets);
  // }
  if (error) 
    {console.log('Error occurred: ' + error);
    return;
    }
    // console.log(tweets);
    
    tweets.forEach(function(infoTweet)
    { console.log();
      console.log("Text: " + infoTweet.text);
      console.log("Time created: " + infoTweet.created_at);
      console.log("Screen name: " + infoTweet.user.screen_name);
      console.log("\n");
    });
});
};

function doWhat(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    var newArray = data.split(",");
    // console.log(newArray);
    app = newArray[0];
    input = newArray[1];
    // console.log(app);
    // console.log(input);
    if (app === "my-tweets") 
    {tweets();
    } 

    else if (app === "spotify-this-song") 
    {spotifySong();
    } 

    else if (app === "movie-this") 
    {movie();
    }
  });
};
// };











