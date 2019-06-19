/**
------------------------------------------------------------------------------------    
    Class DashboardWorker
    http://www.tothenew.com/blog/connect-to-postgresql-using-javascript/
------------------------------------------------------------------------------------
*/


/**
 * Module exports.
 * @public
 */


var DashboardWorker = exports = module.exports = {};


DashboardWorker.dashtoString =  
	function(){
				return ("Mensagem interna: Funcao DaskboardWorker Encontrada"); 
	};
		 
DashboardWorker.execute=  function(sala){
	  
		const {Pool,Client} = require('pg');
		const myQuery = "select * from xmpp_log where (msg_room = '"+sala+"');"
		try { 
			const connectionString = 'postgressql://postgres:postgres@localhost:5432/openfire';
			const client = new Client({
					connectionString:connectionString
			})

			client.connect()
					
			console.log ("conexão realizada com sucesso");
			console.log (myQuery);
		
			client.query( myQuery, 	(err,res)=>{
				DashboardWorker.process(res.rows);
				client.end();
			})
		} catch (ex){
			 console.log ( 'Something is wrong => ' + ex);

		} 
}
DashboardWorker.process = function(result) {
	    //---------------------------------------------------------------------------------------------------
		console.log ('acesso ao moduloDashboardWorker.process. Iniciando o looping de varredura de arquivo');
		//	-------------------------------------------------------------------------------------------------
		const Participante = require('./participante.js');
		const Mensagem = require('./mensagem.js');
		const ContadorMensagens = require('./contadorMensagens.js')
		var participantes = [];
		var mensagens = [];

		for(var i= 0 ; i < result.length ; ++i) {
				line = result[i];
				
				var mensagem =  new Mensagem(line.msg_time,line.msg_text);
				
			    var posicao = DashboardWorker.procuraParticipante(participantes, line.msg_user);
				
				if (posicao < 0){
					var participante = new Participante(line.msg_user,mensagem);
					participantes.push(participante);
				} else {
					var participante = participantes[posicao];
					participante.mensagens.push(mensagem);
					participantes[posicao] = participante; 
				}
		}
		
		console.table(participantes);

		//	--------------------------------------------------
		console.log ('retornando ao script principal');
		//	--------------------------------------------------

	}

	DashboardWorker.procuraParticipante = function (participantes, nome){
		var result = -1;
		for (var k=0; k < participantes.length; ++k){
			if (participantes[k].nome===nome){
			   return k;
			}
		}
		return result;
	
	}

