var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg = require('pg');
var connectionString  = 'postgres://localhost:5432/TASKMASTER';


app.listen(8080, 'localhost', function(req, res){
  console.log('server is listening');
});

// static folder
app.use( express.static( "public" ) );
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

app.post('/addNew', urlencodedParser, function(req, res){
  console.log( 'in POST addNew: ' + req.body.task + " " + req.body.complete );
    pg.connect( connectionString, function( err, client, done ){
      client.query( 'INSERT INTO harry_tasker ( entry, completed,created  ) VALUES ( $1, $2, $3)', [ req.body.task, req.body.complete, 'now()' ] );
});
});
