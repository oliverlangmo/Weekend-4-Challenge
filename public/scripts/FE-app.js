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

  });
});
