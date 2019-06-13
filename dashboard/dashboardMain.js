/*
------------------------------------------------------------------------------------    
    Class DashboardMain
------------------------------------------------------------------------------------
*/
DashboardMain = function(){
    if (! window.Worker){
        console.error ('browser nao compativel - usar Firefox ou chrome');
    }
    var worker = new Worker ('dashboardWorker.js');
    worker.addEventListener('message', function(event){
        console.log(event);
    });
    worker.postMessage('start');
}