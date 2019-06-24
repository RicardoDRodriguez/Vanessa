/**
 * http://usejsdoc.org/
 */
const first = function(){
		console.log("function first");
}
const second = function(){
	console.log("function second");
}

const interval = async() =>{
	await setInterval(first,2000);
	await setInterval(second,3000);
}
