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
}
exports = module.exports = Participante;