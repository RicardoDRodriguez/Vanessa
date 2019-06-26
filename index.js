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
	var bar_color = [ 
    	"color: #003f5c,",
    	"color: #58508d",
    	"color: #bc5090",
    	"color: #ff6361",
    	"color: #ffa600",
    	"color: #2f4b7c",
    	"color: #665191",
    	"color: #a05195",
    	"color: #d45087",
    	"color: #f95d6a",
    	"color: #ff7c43",
    	"color: #ffa600",
    	"color: #aecdc2",
    	"color: #6aaa96",
    	"color: #f0b8b8",
    	"color: #e67f83",
    	"color: #de425b",
    	"color: #bad0af",
    	"color: #e66572",  
    	"color: #003f5c",
    	"color: #58508d",
    	"color: #bc5090",
    	"color: #ff6361",
    	"color: #ffa600",
    	"color: #2f4b7c",
    	"color: #665191",
    	"color: #a05195",
    	"color: #d45087",
    	"color: #f95d6a",
    	"color: #ff7c43",
    	"color: #ffa600",
    	"color: #aecdc2",
    	"color: #6aaa96",
    	"color: #f0b8b8",
    	"color: #e67f83",
    	"color: #de425b",
    	"color: #bad0af",
    	"color: #e66572", 
    ];
	console.log(dwr.dashtoString());
	 dwr.execute('teste2').then( result => {
		dwr.process(result);
		db_line = dwr.getContadoresforGoogleChart();
		db_bar = dwr.getBarforGoogleChart();
		res.render(__dirname+"/ejs/index", { db_line: db_line, db_bar: db_bar, bar_color: bar_color} );
	}) 
});

//-------------------
//Executa a aplicação
//-------------------

app.listen(8081, function(){
	console.log("Servidor rodando na url: http://localhost:8081");
});


