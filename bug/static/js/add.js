$(function() {
	$('#register_btn').click(function(event) {
		$('#progress_bar').show()
		setTimeout(function() {
			console.log('hi')
			$('#progress_bar').hide()
			$('#regestration_form').submit()
		}, 1500)
		return false
	})
})