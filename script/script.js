function ShowCurrentDate() {
	var d = new Date();
	console.log(d);
	var y = d.getFullYear();
	var mon = add0(d.getMonth()+1);
	var day = add0(d.getDate());
	var h = add0(d.getHours());
	var m = add0(d.getMinutes());
	var s = add0(d.getSeconds());
	document.getElementById("date").innerHTML = day + "/" + mon + "/" + y +  "-" + h + ":" + m +":" + s;
}

function ShowDateDifference(d1){
	var d = new Date();
	var dif = dateDifference(d, d1);
	document.getElementById("nextdate").innerHTML = "Faltam " + dif + " dia(s) para a proxima entrega";
}

function timeFunc(){
	var entregas = [new Date(2019,2,11,9), new Date(2019,2,25,9)];
	var entregas_filtradas = entregas.filter(pastDate);
	console.log(entregas_filtradas);
	ShowCurrentDate();
	ShowDateDifference(entregas_filtradas[0]);
	var t = setTimeout(timeFunc,500);
}

function add0(i){
	if(i<10){
		i = "0" + i;
	}
	return i;
}

function pastDate(d1, d2){
	return d1>d2;
}

function dateDifference(d1, d2) {
	var t1 = d1.getTime();
	var t2 = d2.getTime();
	var mildiff = Math.abs(t2-t1);
	return Math.floor(mildiff/(1000*60*60*24));
}


