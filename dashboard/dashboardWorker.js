/**
------------------------------------------------------------------------------------    
    Class DashboardWorker
    http://www.tothenew.com/blog/connect-to-postgresql-using-javascript/
    
    // graficos do google
    
    https://www.npmjs.com/package/google-charts
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
				if (res){
					DashboardWorker.process(res.rows);
				}
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
		var contadoresMensagens = []
		var start;
	
		//====================================
		// Identifica a hora inicial do chat
		//====================================

		if (result[0]){
		 	start = result[0].msg_time;
		 	console.log('Start: ' + start);
		}
	
		for(var i= 0 ; i < result.length ; ++i) {
				line = result[i];
				
				var mensagem =  new Mensagem(line.msg_time,line.msg_text);
				//==============================================================================
				// Calcula dados dos participantes
				//==============================================================================				
			    var posicao = DashboardWorker.procuraParticipante(participantes, line.msg_user);
				
				if (posicao < 0){
					var participante = new Participante(line.msg_user,mensagem);
					participantes.push(participante);
				} else {
					var participante = participantes[posicao];
					participante.mensagens.push(mensagem);
					participantes[posicao] = participante; 
				}
				
				//===============================================================================
				// Calcula dados dos contadores de mensagem (minutos são inversos: menor é maior
				//===============================================================================
			   
			   var minutes = DashboardWorker.getDifferenceFromStart(line.msg_time,start);
			    			
			   posicao = DashboardWorker.procuraContador(contadoresMensagens, minutes);
				
				if (posicao < 0){
					var contadorMensagens = new ContadorMensagens(minutes);
					contadoresMensagens.push(contadorMensagens);
				} else {
					var contadorMensagens = contadoresMensagens[posicao];
					contadorMensagens.adicionarTotalMensagens();
					contadoresMensagens[posicao] = contadorMensagens; 
				}
				
				
		}
		
		// console.table(participantes);
		console.log("==================================================================");
		// console.table(contadoresMensagens);
		console.log ('retornando ao script principal');
		//	--------------------------------------------------

	}
    /**
    	Procura por Participante no Vetor
    */
	DashboardWorker.procuraParticipante = function (participantes, nome){
		var result = -1;
		for (var k=0; k < participantes.length; ++k){
			if (participantes[k].nome===nome){
			   return k;
			}
		}
		return result;
	
	}

   /**
    	Procura por contador no Vetor
    */
	DashboardWorker.procuraContador = function (contadoresMensagens, minutes){
		var result = -1;
		for (var k=0; k < contadoresMensagens.length; ++k){
			if (contadoresMensagens[k].minutes == minutes){
			   return k;
			}
		}
		return result;
	
	}

	/**
    	Calcula a diferençca de tempo para o contador
    */
	
	DashboardWorker.getDifferenceFromStart = function(theDate,start){
	    minutes = Math.round((theDate.getTime() - start.getTime())/60000)
		return minutes ;
	}
	
	DashboardWorker.getContadoresforGoogleChart = function(){
		var data = [
	          ['Minutos', 'Mensagens'],
	          ['2004',  1000],
	          ['2005',  1170],
	          ['2006',  660],
	          ['2007',  1030]
	        ];
		
		return data;
	}
	
	