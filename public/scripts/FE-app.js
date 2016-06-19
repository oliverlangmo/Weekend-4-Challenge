console.log('script sourced');

$(document).ready(function(){

  console.log('jquery works');
$('#sendTask').on('click', function(){
   var newTaskName = $('#taskIn').val();
    var newTask={
      'task': newTaskName,
      'complete': false
    };
 $.ajax({
    type: 'POST',
    url: '/addNew',
    data: newTask
   });
   getTasks();
  });
  $( '#getTasks' ).on( 'click', getTasks);
  $( '#taskDiv' ).on( 'click','.deleteMe', deleteTask );
  $('#taskDiv').on('click', '#completeMe', completeTask);

  function deleteTask(){
   var deleteID = $( this ).data( 'id' );
   console.log(deleteID);
   var delTask = {
     "id": deleteID
   };
  $.ajax({
       type: 'POST',
       url: '/postDelete',
       data: delTask
   });
   getTasks();
   }

function getTasks(){
$.ajax({
type : 'GET',
url: '/getTasks',
success: function(data) {
  showTasks(data);
}
});
}
function completeTask() {
  var completeID = $(this).data('id');
  var complTask = {
    "id": completeID
  };
 $.ajax({
      type: 'POST',
      url: '/completeTask',
      data: complTask,

  });
 getTasks();
 }


function showTasks( tasks ){
  console.log( "in showTasks: ", tasks );
  // empty output div and input field
  $( '#taskIn' ).val( "" );
  $( '#taskDiv' ).empty();
  $('#completedDiv').empty();
  // append each row to task div
  for( var i=0; i<tasks.length; i++ ){
  console.log(tasks);
  if(tasks[i].completed===false){
   $( '#taskDiv' ).append( '<p id = "taskPane"><b>Task: ' + tasks[i].entry + '<br/></b>Complete?: ' + tasks[i].completed + ", created: " + tasks[ i ].created +'<button id="completeMe" data-id="' + tasks[i].id + '">Complete</button><button class="deleteMe" data-id="' + tasks[i].id + '">Delete</button>'+'</p>' );
 } else{
   $('#completedDiv').show();
   $('#completedDiv').append( '<p id ="taskPane"><b>Task: ' + tasks[i].entry + '<br/></b>Complete?: ' + tasks[i].completed + ", created: " + tasks[ i ].created +'</p>' );
 }
}
}
});
