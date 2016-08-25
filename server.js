//import express package
var express = require("express");
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

var entity = process.argv[2];
var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';
var prod = true;
var entityName = '';
var baseDir = 'static2/';
var sql = "select ITEM from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";

var sql2 = "SELECT *, 2013 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
+ "union SELECT *, 2014 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')";

var sql3 = "SELECT distinct(RPT_REC_NUM) entity from "+schema+"."+table;

if(prod) {	
	baseDir = 'static2/';
	db = '10.10.10.11';
	//entity = 101508;
	sql = "select distinct(ITEM) from HOSPC.HOSPC_2009_CLXN  where cmsid  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";
	sql2 = "SELECT *,2009 myyear FROM HOSPC.HOSPC_2009_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	" SELECT *,2010 myyear FROM HOSPC.HOSPC_2010_CLXN where cmsid =  " + entity + "  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	" SELECT *,2011 myyear FROM HOSPC.HOSPC_2011_CLXN where cmsid =  " + entity + "  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	" SELECT *,2012 myyear FROM HOSPC.HOSPC_2012_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	"SELECT *,2013 myyear FROM HOSPC.HOSPC_2013_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ " union "+
	"SELECT *,2014 myyear FROM HOSPC.HOSPC_2014_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')";
	sql3 = "SELECT distinct(cmsid) entity FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511');"

}
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}


//console.log(sql);

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





//create express app
var app = express();

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Defining middleware to serve static files
app.use('/public', express.static('public'));
app.get("/fuelPrices", function(req, res){
	//console.log(res);
  getData(res);
});
app.get("/", function(req, res){
  res.render("chart");
});

app.listen("3300", function(){
  console.log('Server up: http://localhost:3300');
});
