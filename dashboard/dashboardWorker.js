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
	       xmppLog: {
	           prefix: "SELECT msg_time, msg_user, msg_text from public.xmpp_log where msg_room = '",
	           sufix: "';"
	       },  
	       
	    },
	}
	
DashboardWorker.acessoDataBase= 
	function(sala){
	  
		const pg = require('pg');

	    var conn = new pg.Client({
	        host: DashboardWorker.postgres.args.host,
	        port: DashboardWorker.postgres.args.port,
	        user: DashboardWorker.postgres.args.user,
	        password: DashboardWorker.postgres.args.password,
	        database: DashboardWorker.postgres.args.database
	    });
	    
	    conn.connect();
	    
	    var sQuery = DashboardWorker.postgres.query.xmppLog.prefix + 
	    			 sala + 
	    			 DashboardWorker.postgres.query.xmppLog.sufix;
	    
	    console.log(sQuery);
	    
	    const myQuery  = conn.query(sQuery,
	    				(err, res) => {
	    						console.log(err ? err.stack : res.rows[0].message)
	    					pg.end()
	    			});
	    
	    myQuery.on('row', function(row,result){
	        result.addRow(row);
	    });
	    
	    return result;
	}
	


