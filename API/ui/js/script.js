// (function upload(){

// 	var uploader = new plupload.Uploader({
// 		browse_button: 'browse',
// 		url: 'http://localhost/way/API/upload'
// 	});

// 	uploader.init();

// 	document.getElementById('start-upload').addEventListener('click', function(e){
// 		console.log(e.target);
// 		uploader.start();
// 	}, false);

// })();

$(document).ready(function(){

	var geocoder = new google.maps.Geocoder();

	$('#getcoordonate').click(function(){
		geocoder.geocode(
			{address: $('#lieu').val()},
			function(result, status){
				if(status === 'OK'){
					$('#getcoordonate').removeClass().addClass('btn btn-success');
					$('#submit').prop('disabled', false);
				}else{
					$('#getcoordonate').removeClass().addClass('btn btn-danger');
					$('#submit').prop('disabled', true);
				}
				var coordonate = result[0].geometry.location;
				// console.log(coordonate.lat() + " - " + coordonate.lng());
				$('input[name="lat"]').val(coordonate.lat());
				$('input[name="lng"]').val(coordonate.lng());
			}
		);
	});

});