var friendsData = require("../data/friends");

module.exports = function(app) {
  // Get kicked off when user finishes survey
  // Need to pass api/friends to URL

  app.get("/api/friends", function(req, res){
    res.json(friendsData);
    console.log("app.get was called")
  });

  app.post("/api/friends", function(req,res) {
    friendsData.push(req.body);

    console.log("scores " + req.body.score);

    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.photo);
    var resultScore = req.body.score;

    var scoreArray = Array.from(resultScore);

    // Do a sum of the new survey result
    var currentSurvey = req.body.scores;
    var currentSurveySum = 0;
    var closetMatch = false;
    var closetMatchName = "";
    var closetMatchPicture = "";
    var delta = "";

    // Do a sum of the new survey result and hold in a variable

    // Loop through the previous database summing up their total

    // Variable that holds the closet match 

    for (var i = 0; i < scoreArray.length; i++) {
      currentSurveySum += parseInt(scoreArray[i]);
    }
    console.log("Current User sum= "+ currentSurveySum);

    // outter loop going through each database score
    // Use length-1 so that it doesn't compare its own score
    for( var i = 0; i < friendsData.length-1; i++) {
      var previousUser = 0;
      // inner for loop adding each score in array
      for(var j = 0; j < friendsData[i].scores.length; j++) {
        previousUser += friendsData[i].scores[j];
      }

      delta = Math.abs((parseInt(previousUser)) - (parseInt(currentSurveySum)));
      console.log(friendsData[i].name + " sum was " + previousUser);
      console.log("The delta is " + delta);

      // Look at the sums of array and push to variable is closest
      if(closetMatch === false) {
        closetMatch = delta;
        closetMatchName = friendsData[i].name;
        closetMatchPicture = friendsData[i].photo;
        console.log(friendsData[i].name + " is the closet match with a delta of " + delta);
      }
      else if(delta < closetMatch) {
        closetMatch = delta;
        closetMatchName = friendsData[i].name;
        closetMatchPicture = friendsData[i].photo;
        console.log( friendsData[i].name + " is the closet match with a delta of " + delta);
      }
    }
    // console.log("Here is your match");
    // console.log("You match closest with " + clo)
      res.json({
        "name": closetMatchName,
        "picture": closetMatchPicture,
      });
  });
}