/**
  Site: Gmail
  Purpose: Add a "Mark as Read and archive" button
  Usage: You need to create the
*/

function setup() {

  //var scriptURL = 'https://script.google.com/d/1sCPHtOJhQ0iIz-MLmeRwt-UhQN7wGSr9ADigY7AjM1LQkPiQMrXnkmcv/edit?usp=drive_web';
  var scriptURL = 'https://script.google.com/d/1sCPHtOJhQ0iIz-MLmeRwt-UhQN7wGSr9ADigY7AjM1LQkPiQMrXnkmcv/edit?usp=sharing';


  // The class name doesn't seem to be generated automatically, but it may change in future
  $('.Cq').after('<div style="position:relative;top:6px;height:0px;background-color:none;font-family:Avenir-Roman;font-size:13px;"><a style="text-decoration:none;color:black;" href="' + scriptURL + '">Mark all as read and archive</a></div>');

  // Does not work since it disables the other buttons on the left
  //$('.Cq').after('<div style="position:relative;top:5px;height:0px;background-color:red;font-family:Avenir-Roman;font-size:12px;"><form action="' + scriptURL + '"><input type="submit" value="Mark all as read and archive"></form></div>');
}

// The delay is required because the full UI isn't loaded right from the beginning
setTimeout(setup, 5000);