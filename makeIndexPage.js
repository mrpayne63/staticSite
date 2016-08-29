var fs = require('fs');
var mysql = require('mysql');

var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2014_DATA';
var prod = false;

var baseDir = 'static2/';


//var sql3 = "SELECT RPT_REC_NUM entity, ITEM from "+schema+"."+table + " where RPT_REC_NUM in ('33962','34912','33880','35273','34474','37593','35517','421555','101515','451520','101518','051511') and  WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM = '0100'";
var sql3 = "SELECT distinct(RPT_REC_NUM) entity from "+schema+"."+table+ " where " +
" RPT_REC_NUM in (31394,32352,32494,32589,32672,32675,33085,33229,33312,33471,33962)";

if(prod) {	
	baseDir = 'static2/';
	db = '10.10.10.11';
	//entity = 101508;
	//sql3 = "SELECT cmsid entity, ITEM FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511') and WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM = '0100' ;"
		sql3 = "SELECT distinct(cmsid) entity FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511');"
}
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}


console.log(sql3);

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

function getEntity(entity,schema,table){
	
	var myRows = [];
	var sql = "select ITEM from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";

	connection.query(sql,function(err, rows) {
		//console.log(rows[0].ITEM + ',' + rows[1].ITEM + ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM);
		var myfile = baseDir + entity + '.name';
		
		for (var i = 0; i < rows.length; i++) {
			
			
		//	for (i = 0; i < 1; i++) {
			console.log(rows[i].ITEM);
			myRows[i] = rows[i].ITEM.toString().trim();
			entityName +=  rows[i].ITEM.toString() 
			entityName +=  '<br />\n';
			//console.log("XXX " + entityName);
	} // end top for loop
		//var entityName = myRows.join(':');//[0].ITEM + ',' + rows[1].ITEM; //+ ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM ; 
		//console.log(entityName);
		
		return myRows;
	}); // end connection callback
}





connection3.query(sql3,function(err, rows) {
	
	

	var indexpage = '<html>	<head><title>Hospice Charts</title></head><body>\n';

	for (var i = 0; i < rows.length; i++) {

		//console.log( rows[i].entity.toString().trim() );
		var sql = "select distinct(ITEM) from  "+schema+"."+table+ "  where cmsid  = "+rows[i].entity.toString().trim()+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'";
		
		if(prod) {	
			baseDir = 'static2/';
			db = '10.10.10.11';
			//entity = 101508;
			//sql3 = "SELECT cmsid entity, ITEM FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511') and WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM = '0100' ;"
				sql3 = "SELECT distinct(cmsid) entity FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511');"
		}
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




