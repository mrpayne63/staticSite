var fs = require('fs');
var mysql = require('mysql');

var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';
var prod = false;

var baseDir = 'static/';


var sql3 = "SELECT RPT_REC_NUM entity, ITEM from "+schema+"."+table + " where RPT_REC_NUM in ('33962','34912','33880','35273','34474','37593','35517','421555','101515','451520','101518','051511') and  WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM = '0100'";


if(prod) {	
	baseDir = 'static2/';
	db = '10.10.10.11';
	//entity = 101508;
	sql3 = "SELECT cmsid entity, ITEM FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511') and WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM = '0100' ;"

}
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}


//console.log(sql3);

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

var connection2 = mysql.createConnection({
    host : db,
    user : 'nodeuser',
    password : 'Cheese2000',
    database : schema
});

connection2.connect(function(err) {
    if (!err) {
        //console.log("Database2 is connected ... nn");
    } else {
        console.log("Error2 connecting database ... nn");
    }
});

var connection3 = mysql.createConnection({
    host : db,
    user : 'nodeuser',
    password : 'Cheese2000',
    database : schema
});

connection3.connect(function(err) {
    if (!err) {
        //console.log("Database3 is connected ... nn");
    } else {
        console.log("Error3 connecting database ... nn");
    }
});







connection3.query(sql3,function(err, rows) {
	
	var indexpage = '<html>	<head><title>Hospice Charts</title></head><body>\n';

	for (var i = 0; i < rows.length; i++) {

		console.log( rows[i].ITEM.toString().trim() );
		//indexpage += '<p>' + entityName + ' <br />';
		indexpage += '<p>' +  rows[i].ITEM.toString().trim() + ' <br />';
		indexpage += '<a href="'+ rows[i].entity+'sb.html"> Stacked Bar Chart </a><br />\n';
		indexpage += '<a href="'+ rows[i].entity+'sc.html"> Stacked Column Chart </a><br />\n';
		indexpage += '<a href="'+ rows[i].entity+'_2charts.html"> Both Stacked Column and Bar Charts </a><br />\n';
		indexpage += '<a href="'+ rows[i].entity+'_3charts.html"> Both Stacked Column and 2 Bar Charts </a><br /></p>\n';
		
} // end top for loop

	indexpage += '</body>\n';
	fs.writeFile(baseDir + 'index.html',indexpage , function(err) {
        if (err)
            throw err;
        process.exit();
    });	
	

}); // end connection callback




