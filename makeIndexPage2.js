var fs = require('fs');
var mysql = require('mysql');
var prod = true;
//if (process.argv.length === 2) {
	//prod = process.argv[1];
	//}
var baseDir = 'static2/';
var db = 'localhost';
if(prod){
	db = '10.10.10.11';
}
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

var connection3 = mysql.createConnection({
    host : 'localhost',
    user : 'nodeuser',
    password : 'Cheese2000',
    database : 'HOSPC'
});

connection3.connect(function(err) {
    if (!err) {
        //console.log("Database3 is connected ... nn");
    } else {
        console.log(err + "Error3 connecting database ... nn");
    }
});

var entity = [31394,32352,32494,32589,32672,32675,33085,33229,33312,33471,33962];
if(prod){
	entity = ['101537','101529','101500','101508','421555','101515','451520','101518','051511']
}
var sheets = ['A','B','D','G','S'];
var years = ['2009','2010','2011','2012','2013','2014'];
var indexpage = '';

for(var x=0;x<entity.length;x++){
	var sql2 = "SELECT distinct(RPT_REC_NUM) entity, ITEM from HOSPC.hospc_2013_DATA where " +
	"  RPT_REC_NUM  = "+entity[x]	+"   and WKSHT_CD = 'S100000' and LINE_NUM = '00100'  and CLMN_NUM in('0100','0200','0300','0400','0500')";
	if(prod) {	

		sql2 = "SELECT distinct(cmsid) entity , ITEM FROM HOSPC.HOSPC_2009_CLXN where cmsid = " + entity[x] + " and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'  " +
				"and CLMN_NUM in('0100','0200','0300','0400','0500');"

	}
	console.log(sql2);
	connection3.query(sql2,function(err, rows) {
		indexpage += rows[0].ITEM.toString().trim() + "<br>\n";
		indexpage += rows[1].ITEM.toString().trim() + "<br>\n";
		indexpage += rows[2].ITEM.toString().trim() + ", " + rows[3].ITEM.toString().trim() + "<br>\n<hr><br>\n";
		
		
		indexpage += '<a href="'+ rows[0].entity.toString().trim()+'_bar.html"> Stacked Bar Chart </a><br />\n';
		indexpage += '<a href="'+ rows[0].entity.toString().trim()+'_sbar.html"> Stacked Column Chart </a><br />\n';
		indexpage += '<a href="'+ rows[0].entity.toString().trim()+'_2charts.html"> Both Stacked Column and Bar Charts </a><br />\n';
		indexpage += '<a href="'+ rows[0].entity.toString().trim()+'_3charts.html"> Both Stacked Column and 2 Bar Charts </a><br />\n';
		
		for(var j =0;j<years.length;j++){//console.log(sheets[i]);
			for(var i =0;i<sheets.length;i++){
				indexpage +=  tmpstring = '<a href="HOSPC-HOSPC_'+years[j]+'_CLXN-'+ rows[0].entity.toString().trim()+'-Sheet'+sheets[i]+'.csv">'+years[j]+' Sheet '+sheets[i]+'</a><br />\n';
		
		}
		}
		indexpage += '</center></p>\n';
		fs.writeFile(baseDir + rows[0].entity.toString().trim()+'_index.html', indexpage,  function(err) {
		if (err) {
		    return console.error(err);
		}
		});
	
	});
}


