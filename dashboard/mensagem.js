/*
    --------------------------------------------------- 
    Class mensagem
    Objetivo: POJO -> Objeto mensagem
    ---------------------------------------------------
*/

Mensagem = function (dateString,content) {
        this.dateDashboard = new DateDashboard(dateString);
        this.content = content; 
        this.toString = function() {
            return this.dateDashboard.toString() + " " + this.content;
        }
};