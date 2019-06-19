/*
    --------------------------------------------------- 
    Class mensagem
    Objetivo: POJO -> Objeto mensagem
    ---------------------------------------------------
*/

Mensagem = function (dateString,content) {
		const DateDashboard = require('./dateDashboard.js');
        this.dateDashboard = new DateDashboard(dateString);
        this.content = content; 
};

exports = module.exports = Mensagem;