var friendsData = require("../data/friends");

module.exports = function(app) {
  // Get kicked off when user finishes survey
  // Need to pass api/friends to URL

  app.get("/api/friends", function(req, res){
    res.json(friendsData);
    console.log("app.get was called")
  });

  app.post("/api/friends", function(req,res) {
    

    var resultScore = req.body.scores;

    console.log("starting value " + resultScore);

    // score of the current user who entered they details
    var scoreArray = resultScore.split("");

    // Array that holds all integers that were converted from survey
    var userScoreInt = [];

     for (var i = 0; i < scoreArray.length; i++) {
       var newNumber = parseInt(scoreArray[i]);
       userScoreInt.push(newNumber);
    }

    var newUser = {
      "name": req.body.name,
      "photo": req.body.photo,
      "scores": scoreArray
    }

    friendsData.push(newUser);

    // Do a sum of the new survey result
    var currentSurvey = req.body.scores;
    var currentSurveySum = 0;
    var closetMatch = false;
    var closetMatchName = "";
    var closetMatchPicture = "";
    // starting delta, must be less than 50
    var delta =0;
    // Do a sum of the new survey result and hold in a variable

    // Loop through the previous database summing up their total

    // Variable that holds the closet match 

   
    // console.log("Current User sum= "+ currentSurveySum);

    // outter loop going through each database score
    // Use length-1 so that it doesn't compare its own score
    for( var i = 0; i < friendsData.length-1; i++) {
      // var previousUser = 0;
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