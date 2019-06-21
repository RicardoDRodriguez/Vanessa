/*
    --------------------------------------------------- 
    Class mensagem
    Objetivo: POJO -> Objeto mensagem
    ---------------------------------------------------
*/

Mensagem = function (date,content) {
		const DateDashboard = require('./dateDashboard.js');
        this.dateDashboard = new DateDashboard(date);
        this.content = content; 
        this.hashString = function() {
    		return (this.dateDashboard+ ' ' + this.content);
    	}
};

exports = module.exports = Mensagem;