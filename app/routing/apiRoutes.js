var friendsData = require("../data/friends");

module.exports = function(app) {
  // Get kicked off when user finishes survey
  // Need to pass api/friends to URL
  app.get("/api/friends", function(req, res){
    res.json(friendsData);
    console.log("app.get was called")
  });

  app.post("/api/friends", function(req,res) {
    
    // Pull out score string from req
    var resultScore = req.body.scores;

    // spilt into array BUT still need to convert to INT
    var scoreArray = resultScore.split("");

    // Array that holds all scores AFTER that were converted from survey
    var userScoreInt = [];

    // Converting from string to INT and pushing to array
     for (var i = 0; i < scoreArray.length; i++) {
       var newNumber = parseInt(scoreArray[i]);
       userScoreInt.push(newNumber);
    }

    // Create obj to push into "database"
    var newUser = {
      "name": req.body.name,
      "photo": req.body.photo,
      "scores": userScoreInt
    }

    friendsData.push(newUser);

    // Gate for first score to unlock
    var closetMatch = false;
    // Will hold the closet match
    var closetMatchName = "";
    // will hold photo
    var closetMatchPicture = "";
    // will hold delta of closest match
    var delta =0;

    // outter loop going through each database score
    // Use length-1 so that it doesn't compare its own score
    for( var i = 0; i < friendsData.length-1; i++) {
      console.log(closetMatch);
      // inner for loop adding each score in array
      forLoopDelta = 0;

      for(var j = 0; j < friendsData[i].scores.length; j++) {

        var diff = userScoreInt[j] - friendsData[i].scores[j];
        var absValue = Math.abs(diff);
        forLoopDelta += absValue;
      }
      console.log(friendsData[i].name + "had a total delta of " + forLoopDelta);

      // Look at the sums of array and push to variable is closest
      if(closetMatch === false) {
        closetMatch = true;
        delta = forLoopDelta;
        closetMatchName = friendsData[i].name;
        closetMatchPicture = friendsData[i].photo;
        console.log(friendsData[i].name + " is the closet match with a delta of " + delta);
      }
      else if(forLoopDelta < delta) {
        delta = forLoopDelta;
        closetMatchName = friendsData[i].name;
        closetMatchPicture = friendsData[i].photo;
        console.log( friendsData[i].name + " is the closet match with a delta of " + delta);
      }
    }

      res.json({
        "name": closetMatchName,
        "photo": closetMatchPicture,
      });
  });
}