/*
    Classe DateDashboard
*/
DateDashboard = function(dateString){

    this.error = true;
    this.date = null;
    this.dateString = dateString;
    this.error = this.dateString = isNaN || dateString == '';
    this.converteData();

    this.converteData = function(){ //data no formato dd-mm-yyyy hh:mn:ss
        if (this.error) {
            return this.getMessageError();
        }
        var dateTimeParts = this.dateString.split(' ');
        var timeParts = dateTimeParts[1].split(':');
        var dateParts = dateTimeParts[0].split('-');
        this.date =  
            new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
    }
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

    this.toString() {
        return (this.dateString + ' ' + this.error + ' ' + this.getDiferenceFromNow());
    }
}