var path = require("path");

module.exports = function(app) 
{
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
    // console.log("I am the survey page");
  });

  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/home.html"));
    // console.log("I am the home page default");
  });
}