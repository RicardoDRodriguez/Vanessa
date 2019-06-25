/*
------------------------------------------------------------------------------------    
    Class DashboardMain
------------------------------------------------------------------------------------
*/

/**
 * Module exports.
 * @public
 */

DashboardMain = function() {
	
	const dwrjs = require ( './dashboardWorker.js');
	this.dwr = new dwrjs();

	this.dashtoString = function(){
		return ("Mensagem interna: Funcao DashboardMain Encontrada"); 
	}
	
	this.execute=  async function() {
			console.log('=============================================================');
			console.log(this.dwr.dashtoString());
			console.log('=============================================================');
			await this.dwr.execute('teste2');
	}
	
	this.getContadoresforGoogleChart= function(){
		console.log('=============================================================');
		console.log('Iniciei o getContadores');
		return this.dwr.getContadoresforGoogleChart();
	}
	
}

exports = module.exports = DashboardMain;

