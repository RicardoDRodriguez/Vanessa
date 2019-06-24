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
const dwr = require ( './dashboardWorker.js')

DashboardMain.dashtoString =  
	function(){
		return ("Mensagem interna: Funcao DashboardMain Encontrada"); 
	};
DashboardMain.execute = function() {
	console.log(dwr.dashtoString());
	dwr.execute('teste2');
}

DashboardMain.getContadoresforGoogleChart = function(){
	return dwr.getContadoresforGoogleChart();
}
