(function addXhrProgressEvent($) {
	var originalXhr = $.ajaxSettings.xhr;
	$.ajaxSetup({
		progress: function(e) { console.log("standard progress callback"); },
		progressUpload: function(e) {
			$('#progress').fadeIn('slow');
			if (e.lengthComputable) {
				var nb = Number( (e.loaded / e.total * 100)) + "%";
				$('.progress-bar').css('width', nb);
			}
		},
		xhr: function() {
			var req = originalXhr(), that = this;
			if (req.upload) {
				if (typeof req.upload.addEventListener == "function") {
					req.upload.addEventListener("progress", function(evt) {
						that.progressUpload(evt);
					},false);
				}
			}
			return req;
		}
	});
})(jQuery);

// Variable to store your files
var files = new Array();

// Add events
$('input[type=file]').change(function(e){
	files.push(e.target.files);
});

$('#form-with-upload').submit(function(e){
	e.preventDefault();
	$('.progress-bar').removeClass('progress-bar-danger progress-bar-success');

	var formData = new FormData(document.forms.namedItem("form-question"));
	$.each(files, function(key, value){
		formData.append(key, value);
	});

	$.ajax({
		type: 'POST',
		url: document.URL,
		contentType: false,
		processData: false,
		// dataType: 'json',
		data: formData,
		cache: false
	}).done(function(data){
		var alert = $('.alert');
		$('.progress-bar').addClass('progress-bar-success');
		alert.fadeIn('slow');
		alert.addClass(data.code);
		alert.append(data.message);
		console.log('success');
	}).fail(function(data, status){
		$('.progress-bar').addClass('progress-bar-danger');
	});
});
