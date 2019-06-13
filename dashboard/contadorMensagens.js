/*
    --------------------------------------------------- 
    Class CountadorMensagens
    Objetivo: POJO -> Objeto Participante
    ---------------------------------------------------
*/
ContadorMensagens = function(){
    create = function(mensagem){
        this.minutes = mensage.dateDashboard.getDiferenceFromNow();
        this.totalMensagens = 0;
    }
    this.compareTo = function(outroContadorMensagens){
        return (this.minutes == outroContadorMensagens.minutes)    
    };
    this.adicionarTotalMensagens= function (){
        this.totalMensagens += 1;
    }
 
}
