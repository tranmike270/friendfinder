var das;
var res;
$('document').ready(function(){
    $(".chosen-select").chosen();
    $('.chosen-container').css("width", "157px");


   
});

Array.min = function(array){
    return Math.min.apply(Math, array);
    };

function submitForm(data){
    $('#friendModal').modal('toggle')
    das = data;
    var name = data.name.value.trim();
    var photo = data.photoLink.value.trim();
    var scores = [
        parseInt(data.q1.value),
        parseInt(data.q2.value),
        parseInt(data.q3.value),
        parseInt(data.q4.value),
        parseInt(data.q5.value),
        parseInt(data.q6.value),
        parseInt(data.q7.value),
        parseInt(data.q8.value),
        parseInt(data.q9.value),
        parseInt(data.q10.value)
    ]

    var newFriend = {
        name : name,
        photo : photo,
        scores : scores
    };

    $.ajax({
        url: '/api/new', 
        method: 'POST', 
        dataType: "JSON",
        data: newFriend, // Passes the data of the new person into the post request
        success: function(response){ // The response of our backend
          console.log("In response"); // To make sure we're in the response
          // Holding the response into the variable spotRes
          var diffArr = [];
          for(var i = 0; i < response.length; i++){
              var difference = [];
              for(var j = 0; j < scores.length; j++){
                var indexDif = Math.abs(scores[j] - response[i].scores[j]);
                difference.push(indexDif);
              }
              var totalDif = difference.reduce(function(accumulator, currentValue, currentIndex, array) {
                return accumulator + currentValue;
              });
              diffArr.push(totalDif);
          };

          var closestNum = Array.min(diffArr);
          console.log("----------");
          console.log(closestNum);
          var closestIndex = diffArr.indexOf(closestNum);
          console.log(closestIndex);
          var closestFriend = response[closestIndex];
          console.log(closestFriend);
          var friendName = closestFriend.name;
          var friendPhoto = closestFriend.photo;
          $('#friendName').text('Meet ' + friendName + "!!");
          
          var img = $('<img>').attr({
              src : friendPhoto,
              alt : friendName + "'s Picture!",
              id : 'picture'
          });

          $('#friendPic').html(img);
           // Puts the array of the song items into the function find song
          console.log(closestFriend);
        }
      });
    

};


function goHome(){
    $.ajax({ 
        url : '/home',
        method: 'GET',
        success: function(err,res){

        }
    })
};