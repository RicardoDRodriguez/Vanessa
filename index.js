/**
 * arquivo principal da pagina de dashboard
 * veja o site: https://tsdn.tecnospeed.com.br/blog-da-consultoria-tecnica-tecnospeed/post/utilizando-a-engine-ejs-para-aplicacoes-em-nodejs
 */

const express = require ("express");
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')

//----------------------------
//Express handlebars module
//----------------------------

const exphbs = require('express-handlebars');
const app = express() //  cria a aplicação.

app.set('view engine', 'ejs')    // Setamos que nossa engine será o ejs
app.use(expressLayouts)          // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
//app.use(bodyParser.urlencoded()) // Com essa configuração, vamos conseguir parsear o corpo das requisições

app.get('/', async(req,res) =>{

	const dwrjs = require ( __dirname+'/dashboard/dashboardWorker.js');
	dwr = new dwrjs();
	console.log(dwr.dashtoString());
	 dwr.execute('teste2').then( result => {
		dwr.process(result);
		db_data = dwr.getContadoresforGoogleChart();
		res.render(__dirname+"/ejs/index", { db_data:db_data } );
	}) 
});

//-------------------
//Executa a aplicação
//-------------------

app.listen(8081, function(){
	console.log("Servidor rodando na url: http://localhost:8081");
});


