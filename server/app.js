var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg = require('pg');
var connectionString  = 'postgres://localhost:5432/TASKMASTER';

//spin up server
app.listen(8080, 'localhost', function(req, res){
  console.log('server is listening');
});

// static folder
app.use( express.static( "public" ) );

//base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

//adds to input to db
app.post('/addNew', urlencodedParser, function(req, res){
  console.log( 'in POST addNew: ' + req.body.task + " " + req.body.complete );
    pg.connect( connectionString, function( err, client, done ){
      client.query( 'INSERT INTO harry_tasker ( entry, completed,created  ) VALUES ( $1, $2, $3)', [ req.body.task, req.body.complete, 'NOW()' ] );
        done();
});
res.end();
});// end add

//sends db entries to client
app.get('/getTasks', urlencodedParser, function(req,res){
  var results = [];
pg.connect(connectionString, function(err, client, done){
  var query = client.query('SELECT * from harry_tasker ORDER BY id ASC');
  query.on( 'row', function( row ) {
            results.push( row );
  });
  query.on('end', function() {
            done();
            // rend back results as a json
            return res.json(results);
        }); // end onEnd
        if(err) {
            console.log(err);
        } // end error
      });
});

//deletes entry from db
app.post( '/postDelete', urlencodedParser, function(req, res){
  console.log('in postDelete: ' + req.body.id);
  var thisID = req.body.id;
  pg.connect( connectionString, function( err, client, done ) {
    client.query( "DELETE FROM harry_tasker WHERE id="+ thisID);
    done();
  });
  res.end();
});//end delete

//changes boolean value of completed
app.post( '/completeTask', urlencodedParser, function(req, res){
  console.log('in completeTask: ' + req.body.id);
  var thisID = req.body.id;
  pg.connect( connectionString, function( err, client, done ) {
    client.query( "UPDATE harry_tasker SET completed = 'true' WHERE id="+ thisID);
    done();
  });
  res.end();
});
