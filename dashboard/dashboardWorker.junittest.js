/*
	JunitTest para acesso ao banco de dados
	Terminal does not work:
	https://stackoverflow.com/questions/47472561/why-the-eclipse-terminal-view-appears-empty-on-mac
	
	
*/
const dwr = require ( './dashboardWorker.js')
		  
console.log(dwr.dashtoString());
result = dwr.execute('teste2')
