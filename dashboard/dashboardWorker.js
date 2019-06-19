/*
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
		 
DashboardWorker.onmessage = 
	function(e) {
	    //--------------------------------------------------
		console.log ('acesso ao worker. Iniciando o looping de varredura de arquivo');
		//	--------------------------------------------------
	
		var participantes = [];
		var mensagens = [];
		var contadorMensangens = new ContadorMensangens();
		var dateDashboard = new DateDashboard();
		var result = acessoDataBase('teste2'); // carrega os registros da sala.
	
	
	
		//	--------------------------------------------------
		console.log ('retornando ao script principal');
		//	--------------------------------------------------
		self.close();
	}
	
DashboardWorker.postgres = { 
	    args: {
	       user: 'postgres',
	       password:  'postgres',
	       host: 'localhost',
	       ip: ' 127.0.0.1',
	       port: '5432',
	       database: 'openfire'
	    },
	    query: {
	       xmppLog: 
	          "SELECT msg_time, msg_user, msg_text from public.xmpp_log where (msg_room = ?);"  
	       
	    },
	}
	
DashboardWorker.acessoDataBase= 
	async function(sala){
	  
		const {Connection} = require('pg');
		
		const connection =  new Connection({
	        host: DashboardWorker.postgres.args.host,
	        port: DashboardWorker.postgres.args.port,
	        user: DashboardWorker.postgres.args.user,
	        password: DashboardWorker.postgres.args.password,
	        database: DashboardWorker.postgres.args.database	
		});
		
		const q = require('q');
		var deferred = q.defer(); 
		
		try { 
			connection.connect();
			console.log ("conexão realizada com sucesso");
			
			const query_str = DashboardWorker.postgres.query.xmppLog;
			const query_var = [sala];
	
			const query = await connection.query(query_str, query_var, function (err, rows, fields) {
			    if (err) {
			        //throw err;           
			        deferred.reject(err);
			    }
			    else {
			        console.table(rows.rows);           
			        deferred.resolve( JSON.stringify(rows));
			    }
			}); 
			await connection.end();
		} catch (ex){
			 console.log ( 'Something is wrong => ' + ex);
		} finally {

			return await deferred.promise;
		}
		
}


