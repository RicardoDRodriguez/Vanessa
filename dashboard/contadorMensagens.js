/*
    --------------------------------------------------- 
    Class CountadorMensagens
    Objetivo: POJO -> Objeto Participante
    ---------------------------------------------------
*/
var ContadorMensagens = exports = module.exports = {};

ContadorMensagens.create = function(mensagem){
        this.minutes = mensagem.dateDashboard.getDiferenceFromNow();
        this.totalMensagens = 0;
}

ContadorMensagens.compareTo = function(outroContadorMensagens){
        return (this.minutes == outroContadorMensagens.minutes)    
}

ContadorMensagens.adicionarTotalMensagens= function (){
        this.totalMensagens += 1;
}
exports = module.exports = ContadorMensagens; 
