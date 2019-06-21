/*
    --------------------------------------------------- 
    Class CountadorMensagens
    Objetivo: POJO -> Objeto Participante
    ---------------------------------------------------
*/

ContadorMensagens  = function(minutes){
        this.minutes = minutes;
        this.totalMensagens = 0;
        
        this.compareTo = function(minutes){
            return (this.minutes == minutes)    
        }
        
        this.hashString = function() {
    		return (this.minutes+ ' ' + this.content);
    	}
        
        this.adicionarTotalMensagens= function (){
            this.totalMensagens += 1;
        }
}
exports = module.exports = ContadorMensagens; 
