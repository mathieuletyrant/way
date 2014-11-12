$(document).ready(function(){
	var geocoder = new google.maps.Geocoder();

	$('#lieu').keypress(function(){

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
});

