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
	function(sala){
	  
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
		
		connection.connect();
		
	 /*   var sQuery = DashboardWorker.postgres.query.xmppLog.prefix + 
	    			 sala + 
	    			 DashboardWorker.postgres.query.xmppLog.sufix;
	    
	    console.log(sQuery);
	    
	    conn.query(sQuery).then (rows => {return rows});
	    conn.end();
	    
	    return 'Não encontrei registros';
	}*/
		
		var query_str = DashboardWorker.postgres.query.xmppLog;
		var query_var = [sala];

		var query = connection.query(query_str, query_var, function (err, rows, fields) {
		    //if (err) throw err;
		    if (err) {
		        //throw err;           
		        deferred.reject(err);
		    }
		    else {
		        //console.log(rows);           
		        deferred.resolve(rows);
		    }
		}); 

		return deferred.promise;
}


