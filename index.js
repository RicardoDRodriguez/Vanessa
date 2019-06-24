/**
 * arquivo principal da pagina de dashboard
 */

const express = require ("express");
const app = express() //  cria a aplicação.

app.get('/', function(req,res){
	res.sendFile(__dirname +"/html/index.html");
	
	/*--------------------------------------------------
	 * Rodar o looping dos graficos de forma assíncrona.
	 * -------------------------------------------------
	 */
	
	
	
});

//-------------------
//Executa a aplicação
//-------------------

app.listen(1732, function(){
	console.log("Servidor rodando na url: http://localhost:1732");
});
