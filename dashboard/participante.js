/*
    --------------------------------------------------- 
    Class Participante
    Objetivo: POJO -> Objeto Participante
    ---------------------------------------------------
*/

Participante = function(){
        create = function(participante){
            this.participante = participante;
            this.messagens = [ ]; 
        };    
        addMensagens = function (mensagem){
            this.messagens.push(mensagem);
        };
        
        this.compareTo = function(outroParticipante){
            return (this.participante == outroParticipante.participante)    
        };
}