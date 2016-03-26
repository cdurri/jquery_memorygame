var imgSource = ""; 
var divId = "";
var imgFound = 0;
var moves = 0;

var imageArray = ["images/emoji_1.jpg", 
"images/emoji_2.jpg", "images/emoji_3.jpg", "images/emoji_4.jpg",
"images/emoji_5.jpg", "images/emoji_6.jpg", "images/emoji_7.jpg",
"images/emoji_8.jpg", "images/emoji_9.jpg", "images/emoji_10.jpg"];

function ShuffleImages() {

  var len = imageArray.length*2;
  var imgArr = new Array();
  imgArr = $.merge($.merge([], imageArray), imageArray);
  var currentDiv = $("#images div:first-child");

  for(var z = 0; z < len; z++)
  {
   var randomNum = Math.round(Math.random()*(imgArr.length-1));
   $("#" + currentDiv.attr("id") + " img").attr("src", imgArr[randomNum]);
   imgArr.splice(randomNum,1);
   currentDiv =currentDiv.next();
 }
}

function OpenCard()
{
  var id = $(this).attr("id");
  if ($("#" + id + " img").is(":hidden"))
  {
    $("#" + id + " img").show("slow");
    if (imgSource == "")
    { 
      divId = id;
      imgSource = $("#" + id + " img").attr("src");
    }
    else 
    {
      currentOpened = $("#" + id + " img").attr("src");
      if (imgSource != currentOpened)
      {
        setTimeout(function() {
          $("#" + id + " img").hide("slow");
          $("#" + divId + " img").hide("slow");

          divId = "";
          imgSource = ""; 
        }, 600);

        
      }
      else
      {
        divId = ""; 
        imgSource = ""; 
        imgFound++;
      }
    }
    moves++;
    $("#moves").html(moves);
    if (imageArray.length == imgFound)
    {
      setTimeout(function() {
        alert("Yes !!! You completed the game with " + moves + " moves");
      }, 1000);
    }
  }
}

function ResetGame() {

  ShuffleImages();
  moves = 0;
  $("#moves").html(moves);
  $("#images div img").hide();
  imgFound = 0;
  imgSource = "";
  divId = "";
}

$(document).ready(function() {
  for(var i=1; i<3;i++)
  {
    $.each(imageArray, function(index, value){
      $("#images").append("<div id=card" + i + index + "><img src=" + value + " /></div>"); 
    })
  }
  ShuffleImages();
  $("#images div").click(OpenCard);
});