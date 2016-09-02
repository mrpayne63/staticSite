var fs = require('fs');
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

if (process.argv.length <= 2) {
   // console.log("Usage: " + __filename + " SOME_PARAM");
   // process.exit(-1);
}
 
var entity = process.argv[2];
var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';
var lastReport;
var prod = false;
var entityName = '';
var baseDir = 'static2/';
var sql = "select distinct(ITEM) from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM in('0100','0200','0300','0400','0500')";

var sql2 = "SELECT *, 2013 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
+ "union SELECT *, 2014 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')";

var sql3 = "SELECT distinct(RPT_REC_NUM) entity from "+schema+"."+table;

if(prod) {	
	baseDir = 'static2/';
	db = '10.10.10.11';
	//entity = 101508;
	sql = "select distinct(ITEM) from HOSPC.HOSPC_2009_CLXN  where cmsid  = "+entity+"  and  WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM in('0100','0200','0300','0400','0500')";
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
	sql3 = "SELECT distinct(cmsid) entity FROM HOSPC.MASTER_DATA where cmsid in ('101515','101534','101520',"+
	"'101545','101502','101526','101528','101549','101500','101551','101513','101577','101527','101527','101550','101507','101529','101537','101525','101516','101523','101518','101527','101510','101553','101530','101548','101536','451781','101543','101552','101527','101540','101512','101532','101511','101508','101521','101533','101517','101522','101537');"
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

var myRows = new Array();

connection.query(sql,function(err, rows) {
	//console.log(rows[0].ITEM + ',' + rows[1].ITEM + ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM);
	var myfile = baseDir + entity + '.name';
	for (var i = 0; i < rows.length; i++) {
		
		
	//	for (i = 0; i < 1; i++) {
		//console.log(rows[i].ITEM);
		myRows[i] = rows[i].ITEM.toString().trim();
		entityName +=  rows[i].ITEM.toString().trim();
		entityName +=  '<br />\n';
		//console.log("XXX " + entityName);
} // end top for loop
	//var entityName = myRows.join(':');//[0].ITEM + ',' + rows[1].ITEM; //+ ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM ; 
	//console.log(entityName);
	

}); // end connection callback



connection3.query(sql3,function(err, rows) {
	//console.log(rows[0].ITEM + ',' + rows[1].ITEM + ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM);
	//console.log(sql3);
	var tmpString = '';
	var myfile3 = 'makeTDcells2.sh';
	for (var i = 0; i < rows.length; i++) {
		tmpString += "echo ' writing array for "+rows[i].entity +" ';\n ";
		tmpString += 'node makeTDcells2.js ' + rows[i].entity + ' >  static2/'+ rows[i].entity+'_td.html;\n';
	//	for (i = 0; i < 1; i++) {
		//console.log(rows[i].entity);
		//myRows[i] = rows[i].ITEM;
		//entityName +=  rows[i].ITEM.toString() + ',';
		//console.log("XXX " + entityName);
} // end top for loop
	//var entityName = myRows.join(':');//[0].ITEM + ',' + rows[1].ITEM; //+ ',' +rows[2].ITEM + ',' +rows[3].ITEM + ',' +rows[4].ITEM ; 
	//console.log(entityName);
	fs.writeFile(myfile3, tmpString, function(err) {
        if (err)
            throw err;
       // console.log(myfile3 + ' saved');

        	//process.exit(0);
       // var array = fs.readFileSync(myfile2).toString().split("\n");
        
        //console.log(array);

    });	
	

}); // end connection callback
		

//console.log(sql2);
connection2.query(sql2,    function(err, rows2) {

	console.log("<td>");
	console.log('<div id="container'+entity+'" style="width: 550px; height: 400px; margin: 0 auto"></div></td>');
	

    process.exit(0);
}); // end connection2 callback

   



