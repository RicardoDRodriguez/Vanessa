/*
    --------------------------------------------------- 
    Class Participante
    Objetivo: POJO -> Objeto Participante
    ---------------------------------------------------
 */


Participante = function(nome,mensagem){
	this.nome = nome;
	this.mensagens = []; 
	this.mensagens.push(mensagem);
	
	this.totalCaracteres = function(){
		result = 0;
		for (var i = 0 ; i < this.mensagens.length ; ++i){
			result += this.mensagens[i].content.length;
		}
		return result;
	}
	
	this.totalMensagens = function(){
		return this.mensagens.length;
	}
}
exports = module.exports = Participante;