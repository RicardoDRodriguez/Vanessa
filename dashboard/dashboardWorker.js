/*
------------------------------------------------------------------------------------    
    Class DashboardWorker
    http://www.tothenew.com/blog/connect-to-postgresql-using-javascript/
------------------------------------------------------------------------------------
*/
'use strict'     
var onmessage = function(e) {
    //--------------------------------------------------
    console.log ('acesso ao worker. Iniciando o looping de varredura de arquivo');
    //--------------------------------------------------

     var participantes = [];
     var mensagens = [];
     var contadorMensangens = new ContadorMensangens();
     var dateDashboard = new DateDashboard();
     var result = acessoDataBase('teste2'); // carrega os registros da sala.
        
     

    //--------------------------------------------------
    console.log ('retornando ao script principal');
    //--------------------------------------------------
    self.close();
}
postgres = { 
    args: {
       user: 'postgres',
       password:  'postgres',
       host: 'localhost',
       ip: ' 127.0.0.1',
       port: '5432',
       database: 'openfire',
       string: 'postgres://'+user+':'+password+ '@'+host+'/'+ip+':'+port+'/'+database,
    },
    query: {
       xmppLog: {
           prefix: "SELECT msg_time, msg_user, msg_text from public.xmpp_log where msg_room = '",
           sufix: "';"
       },  
       
    },
}
acessoDataBase = function(sala){
    var pg = require(‘pg’);
    var conn = new pg.Client({
        host: postgres.args.host,
        port: postgres.args.port,
        user: postgres.args.user,
        password: postgres.args.password,
        database: postgres.args.database
    });
    conn.connect();
    var sQuery = postgres.query.xmppLog.prefix + sala + postgres.query.xmppLog.sufix;
    var query  = conn.query(sQuery);
    
    query.on("row", function(row,result){
        result.addRow(row);
    });
    
    return result;
}