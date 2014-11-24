if(document.querySelectorAll('.total_point')) {
	var span = document.querySelectorAll('.total_point');
	for(var i = 0; i < span.length; i++) {
		animePoint(span[i].getAttribute('data-point'), span[i]);
	}
}

function animePoint(points, span) {
	var ct = 0;
	var vit = 200;
	setInterval(function(){
		if(ct < points) {
			ct++;
			span.innerHTML = ct;
		}else {
			clearInterval();
		}		
	}, vit);

}