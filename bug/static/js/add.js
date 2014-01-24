$(function() {
	// submit with progress-bar emulation
	$('#register_btn').click(function(event) {
		if ($('form').valid()) {
			$('#progress_bar').show()
			setTimeout(function() {
				console.log('hi')
				$('#progress_bar').hide()
				sendData()
			}, 1500)
		}
	})

	// datepicker
	$('#birthDate').datepicker({
		format: "mm/dd/yyyy",
		startDate: '01/01/1950',
		startView: 'year'
	})
	// validations
	jQuery.validator.setDefaults({
		debug: true,
		success: "valid"
	})
	$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
	)
	$('form').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true,
				regex: '[a-zA-Z.@]{1,40}'
			},
			birthDate: {
				required: true,
				date: true
			},
			position: {
				required: true
			},
			permission: {
				required: true
			}
		},
		errorElement: 'span',
	    errorClass: 'help-block',
	    errorPlacement: function(error, element) {
	        if(element.parent('.input-group').length) {
	            error.insertAfter(element.parent());
	        } else {
	            error.insertAfter(element);
	        }
	    },
		highlight: function(element) {
      		$(element).closest('.form-group').addClass('has-error');
	    },
	    unhighlight: function(element) {
	        $(element).closest('.form-group').removeClass('has-error');
	    }
	})
	
})

function sendData() {
	var name = $('#name').val()
	var email = $('#email').val()
	var sex = $("input[name=sex]:checked").val()
	var birthDate = $('#birthDate').val()
	var position = $('#position').val()
	var permission = $('#permission').is(":checked")
	var data = 'name='+name+'&'+
				'email='+email+'&'+
				'sex='+sex+'&'+
				'birthDate='+birthDate+'&'+
				'position='+position
	$.ajax({
		type: "POST",
		url: 'add',
		data: data,
		success: function(data) {
			if (data.result == 'ok') {
				alert('registration successfusl')

			}
		},
		error: function() {
			alert('server error!')
		}
	});
}