/**
 * arquivo principal da pagina de dashboard
 * veja o site: https://tsdn.tecnospeed.com.br/blog-da-consultoria-tecnica-tecnospeed/post/utilizando-a-engine-ejs-para-aplicacoes-em-nodejs
 */

const express = require ("express");

//----------------------------
//Express handlebars module
//----------------------------

const exphbs = require('express-handlebars');
const app = express() //  cria a aplicação.

//app.engine('handlebars', exphbs({defaultLayout: 'base'}));
//app.set('view engine', 'handlebars');

app.get('/', function(req,res){

	const dm = require ( __dirname+'/dashboard/dashboardMain.js')
	console.log(dm.dashtoString());
	result = dm.execute();
	db_data = dm.getContadoresforGoogleChart();
	res.sendfile(__dirname+"/html/index.html", {db_data:db_data} );
	
});

//-------------------
//Executa a aplicação
//-------------------

app.listen(8081, function(){
	console.log("Servidor rodando na url: http://localhost:8081");
});


