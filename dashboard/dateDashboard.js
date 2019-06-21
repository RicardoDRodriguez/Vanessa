/*
    Classe DateDashboard
 */

DateDashboard = function(date){

	this.date = date;
	this.error = this.date = isNaN || date == '';

	this.getMessageError = function(){
		console.error("Data informada é nula: "+ dateString);
		return null;
	}
	this.getTimeStamp = function (){
		if (this.error) {
			return this.getMessageError();
		}
		return this.date.getTimeStamp();
	}
	this.getDiferenceFromNow = function() {
		if (this.error) {
			return this.getMessageError();
		}
		var now  = $.now();
		var diffMs = (this.date - now);
		return Math.round(((diffMs % 86400000) % 3600000) / 60000);
	}
	this.hashString = function() {
		return (this.dateString + ' ' + this.error + ' ' + this.getDiferenceFromNow());
	}
}

exports = module.exports = DateDashboard;
