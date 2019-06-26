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

participantes= [];
mensagens =  []
contadoresMensagens=  [],
tablerows = [];

DashboardWorker = function () { 

	this.dashtoString= function(){
		return ("Mensagem interna: Funcao DaskboardWorker Encontrada"); 
	};

	this.execute=  async function(sala){

		//console.log('Entrei no execute');
		const {Pool,Client} = require('pg');
		const myQuery = "select * from xmpp_log where (msg_room = '"+sala+"');"

		try { 
			const connectionString = 'postgressql://postgres:postgres@localhost:5432/openfire';
			const client = new Client({
				connectionString:connectionString
			})

			await client.connect()
			tablerows = new Array();
			
			//console.log('=========================================================================================');
			//console.log ("conexão realizada com sucesso");
			
			//console.log (myQuery);
			
			//console.log('=========================================================================================');
			//console.log ("Aguardando a execução da query");
			
			var res = await client.query(myQuery);
			
			//console.log('=========================================================================================');
			//console.log ("Carregando linhas no objeto result");
			
			var result = res.rows;
			
			//console.log('=========================================================================================');
			//console.log ("Aguardando fim da conexão");

			await client.end();

			//console.log('=========================================================================================');
			//console.log ("Processo Encerrado retornando result");

			// console.table(result);
			
			return result;

		} catch (ex){
			console.log ( 'Something is wrong => ' + ex);

		} finally {
			
		}


	},

	this.process= function(result) {
		//console.log('=========================================================================================');
		//---------------------------------------------------------------------------------------------------
		//console.log ('acesso ao moduloDashboardWorker.processo');
		//	-------------------------------------------------------------------------------------------------
		const Participante = require('./participante.js');
		const Mensagem = require('./mensagem.js');
		const ContadorMensagens = require('./contadorMensagens.js')

		participantes= [];
		mensagens = [];
		contadoresMensagens = [];

		var start;

		//====================================
		// Identifica a hora inicial do chat
		//====================================

		if (result[0]){
			start = result[0].msg_time;
			//console.log('Start: ' + start);
		}

		for(var i= 0 ; i < result.length ; ++i) {
			line = result[i];

			var mensagem =  new Mensagem(line.msg_time,line.msg_text);
			//==============================================================================
			// Calcula dados dos participantes
			//==============================================================================				
			var posicao = this.procuraParticipante(participantes, line.msg_user);

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

			var minutes = this.getDifferenceFromStart(line.msg_time,start);

			posicao = this.procuraContador(contadoresMensagens, minutes);

			if (posicao < 0){
				var contadorMensagens = new ContadorMensagens(minutes);
				contadoresMensagens.push(contadorMensagens);
			} else {
				var contadorMensagens = contadoresMensagens[posicao];
				contadorMensagens.adicionarTotalMensagens();
				contadoresMensagens[posicao] = contadorMensagens;
			}


		}

		//console.table(this.participantes);
		//console.log("==================================================================");
		// console.table(contadoresMensagens);
		//	--------------------------------------------------
		
		return true;
	}

	/**
    	Procura por Participante no Vetor
	 */

	this.procuraParticipante= function (participantes, nome){
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
	this.procuraContador= function (contadoresMensagens, minutes){
		var result = -1;
		for (var k=0; k < contadoresMensagens.length; ++k){
			if (contadoresMensagens[k].minutes == minutes){
				return k;
			}
		}
		return result;

	},

	/**
	 */

	this.getDifferenceFromStart= function(theDate,start){
		minutes = Math.round((theDate.getTime() - start.getTime())/60000)
		return minutes ;
	},

	this.getContadoresforGoogleChart= function(){
		//console.log('=============================================================');
		//console.log('Iniciei o getContadores');
		
		var start = (contadoresMensagens.length) - 11;

		if (start < 0) start = 0;
		var arrayLabelValue = [];
		
		//console.log('=============================================================');
		//console.log('start => ' , start);
		
		for (var z = start; z < contadoresMensagens.length; ++z){
			var posicao ="M-"+(contadoresMensagens.length-z-1)
			arrayLabelValue.push (new this.LabelValue(posicao, contadoresMensagens[z].totalMensagens,0,0))
		}

		var data = { 'data' : arrayLabelValue};

		return data;
	},

	this.getBarforGoogleChart= function(){
	
		//console.log('=============================================================');
		//console.log('Iniciei o getContadores');
		
		var start = 0;

		var arrayLabelValue = [];
		
		for (var z = start; z < participantes.length; ++z){
			arrayLabelValue.push (new this.LabelValue(participantes[z].nome, 
					participantes[z].totalMensagens(),participantes[z].totalCaracteres(),0))
		}

		var data = { 'data' : arrayLabelValue};
		
		//console.log('=============================================================');
		//console.log(data);
		
		return data;
	},
	
	this.LabelValue= function (myLabel,myValue,myValue1,myValue2){
		this.label = myLabel;
		this.value = myValue;
		this.value1 = myValue1;
		this.value2 = myValue2;
	}


}
exports = module.exports = DashboardWorker;

