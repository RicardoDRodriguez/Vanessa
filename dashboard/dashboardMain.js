/*
------------------------------------------------------------------------------------    
    Class DashboardMain
------------------------------------------------------------------------------------
*/

/**
 * Module exports.
 * @public
 */

var DashboardMain = exports = module.exports = {};

DashboardMain.dashtoString =  
	function(){
		return ("Mensagem interna: Funcao DashboardMain Encontrada"); 
	};
DashboardMain.execute = function() {
	const dwr = require ( './dashboardWorker.js')
	console.log(dwr.dashtoString());
	dwr.execute('teste2');

}

