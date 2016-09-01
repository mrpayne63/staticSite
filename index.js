var connect = require('connect');
var serveStatic = require('serve-static');
var mysql = require('mysql');

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
var app = connect();
var entity = process.argv[2];
var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';

var sql = "select ITEM from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";

//console.log(sql);
var myRows = new Array();
var connection = mysql.createConnection({
  host : db,
  user : 'nodeuser',
  password : 'Cheese2000',
  database : schema
});

connection.connect(function(err) {
  if (!err) {
      //console.log("Database is connected ... nn");
  } else {
      console.log("Error connecting database ... nn");
  }
});


function getData(entity){
	connection.query(sql,function(err, rows) {
		console.log(rows[0].ITEM + ',' + rows[1].ITEM + ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM);
		//var myfile = baseDir + entity + '.name';
		
		for (var i = 0; i < rows.length; i++) {
			
			
		//	for (i = 0; i < 1; i++) {
			//console.log(myRows);
			myRows[i] = rows[i].ITEM.toString().trim();
			//console.log("XXX " + entityName);
	} // end top for loop
		//var entityName = myRows.join(':');//[0].ITEM + ',' + rows[1].ITEM; //+ ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM ; 
		//console.log(entityName);
		console.log(myRows);
		return myRows;

	}); // end connection callback
	//console.log(myRows);
	
}
var myArray = getData(entity);
//console.log(myArray);
app.use(serveStatic(__dirname + '/static2'));
app.use(serveStatic(__dirname + '/static'));

app.listen(3300);
console.log("listening 8080");