/*
    --------------------------------------------------- 
    Class mensagem
    Objetivo: POJO -> Objeto mensagem
    ---------------------------------------------------
*/

Mensagem = function (dateString,content) {
		const DateDashboard = require('./dateDashboard.js');
        this.dateDashboard = new DateDashboard(dateString);
        console.log(this.dateDashboard);
        this.content = content; 
        this.hashString = function() {
    		return (this.dateDashboard+ ' ' + this.content);
    	}
};

exports = module.exports = Mensagem;