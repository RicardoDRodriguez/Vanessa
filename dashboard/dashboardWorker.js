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
		
global.participantes= [];
global.mensagens =  []
global.contadoresMensagens=  [],
		
DashboardWorker = function () { 

		this.dashtoString= function(){
			return ("Mensagem interna: Funcao DaskboardWorker Encontrada"); 
		};

		this.execute=  async function(sala){

			console.log('Entrei no execute');
			const {Pool,Client} = require('pg');
			const myQuery = "select * from xmpp_log where (msg_room = '"+sala+"');"

			try { 
				const connectionString = 'postgressql://postgres:postgres@localhost:5432/openfire';
				const client = new Client({
					connectionString:connectionString
				})

				client.connect()
				var result = new Array();
				console.log ("conexão realizada com sucesso");
				console.log (myQuery);

				
			    /*client.query( myQuery, 	(err,res)=>{
					if (res){
						this.process = (res.rows);
					}
					client.end();
				})*/
				client.query(myQuery)
					  .then(res => { 
						    this.process(res)
						   	.then(console.log('Encerrei o processamento da query - fim do Execute'))
						    .catch(error => console.error(error.stack));
					  })
					  .catch(error => console.error(error.stack));

			} catch (ex){
				console.log ( 'Something is wrong => ' + ex);

			} 

			
		},

		this.process= async function(result) {
			console.log('=========================================================================================');
			//---------------------------------------------------------------------------------------------------
			console.log ('acesso ao moduloDashboardWorker.process. Iniciando o looping de varredura de arquivo');
			//	-------------------------------------------------------------------------------------------------
			const Participante = require('./participante.js');
			const Mensagem = require('./mensagem.js');
			const ContadorMensagens = require('./contadorMensagens.js')

			global.participantes= [];
			global.mensagens = [];
			global.contadoresMensagens = [];
			
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
				var posicao = this.procuraParticipante(global.participantes, line.msg_user);

				if (posicao < 0){
					var participante = new Participante(line.msg_user,mensagem);
					global.participantes.push(participante);
				} else {
					var participante = global.participantes[posicao];
					participante.mensagens.push(mensagem);
					global.participantes[posicao] = participante; 
				}

				//===============================================================================
				// Calcula dados dos contadores de mensagem (minutos são inversos: menor é maior
				//===============================================================================

				var minutes = this.getDifferenceFromStart(line.msg_time,start);

				posicao = this.procuraContador(global.contadoresMensagens, minutes);

				if (posicao < 0){
					var contadorMensagens = new ContadorMensagens(minutes);
					global.contadoresMensagens.push(contadorMensagens);
				} else {
					var contadorMensagens = global.contadoresMensagens[posicao];
					contadorMensagens.adicionarTotalMensagens();
					global.contadoresMensagens[posicao] = contadorMensagens;
				}


			}

			//console.table(this.participantes);
			console.log("==================================================================");
			console.table(global.contadoresMensagens);
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
			console.log('=============================================================');
			console.log('Iniciei o getContadores');
			console.log('=============================================================');
			
			console.table(global.contadoresMensagens);

			var start = (global.contadoresMensagens.length) - 11;
			
			if (start < 0) start = 0;
			var arrayLabelValue = [];
			
			for (var z=start; z < global.contadoresMensagens.length; ++z){
				var posicao ="M-"+(global.contadoresMensagens.length-z-1)
				arrayLabelValue.push (new this.LabelValue(posicao, this.contadoresMensagens[z].totalMensagens))
			}
			
			var data = { 'data' : arrayLabelValue};

			console.log(data);

			return data;
		},

		this.LabelValue= function (myLabel,myValue){
			this.label = myLabel;
			this.value = myValue;
		}


}
exports = module.exports = DashboardWorker;

