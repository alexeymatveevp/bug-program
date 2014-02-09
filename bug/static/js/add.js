$(function() {
	// submit with progress-bar emulation
	$('#register_btn').click(function(event) {
		if ($('#registration_form').valid()) {
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
	jQuery.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
	)
    jQuery.validator.addMethod(
        "passwd_check",
        function(value, element) {
            return $('#passwd').val() == $('#passwd_re').val();
        },
        "Password re-type must match password."
    )
    jQuery.validator.addMethod(
        "email_check",
        function(value, element) {
            var valid = false
            $.ajax({
                type: "GET",
                url: 'validate/email',
                async: false,
                data: 'email='+value,
                success: function(data) {
                    if (data.result == 'ok') {
                        valid = true
                    }
                }
            });
            return valid
        },
        "Sorry, this email already exist, please choose another one"
    )
    jQuery.validator.addMethod(
        "account_check",
        function(value, element) {
            var valid = false
            $.ajax({
                type: "GET",
                url: 'validate/account',
                async: false,
                data: 'account='+value,
                success: function(data) {
                    if (data.result == 'ok') {
                        valid = true
                    }
                }
            });
            return valid
        },
        "Sorry, this account is already in use, please choose another one"
    )
	$('#registration_form').validate({
		rules: {
			account: {
				required: true,
                maxlength: 30,
                account_check: 'yes'
			},
            firstname: {
                required: true,
                maxlength: 20,
                regex: '^[a-zA-Z]*$'
            },
            lastname: {
                maxlength: 20,
                regex: '^[a-zA-Z]*$'
            },
			email: {
				required: true,
				email: true,
				maxlength: 40,
                email_check: 'yes'
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
			},
            password: {
                required: true,
                regex: '^.{1,40}$'
            },
            password_re: {
                passwd_check: true
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
	var account = $('#account').val()
	var firstname = $('#firstname').val()
	var lastname = $('#lastname').val()
	var email = $('#email').val()
	var sex = $("input[name=sex]:checked").val()
	var birthDate = $('#birthDate').val()
	var position = $('#position').val()
	var permission = $('#permission').is(":checked")
    var passwd = $('#passwd').val()
	var data = 'account='+account+'&'+
				'firstname='+firstname+'&'+
				'lastname='+lastname+'&'+
				'email='+email+'&'+
				'sex='+sex+'&'+
				'birthDate='+birthDate+'&'+
				'position='+position+'&'+
                'passwd='+passwd
	$.ajax({
		type: "POST",
		url: 'add',
		data: data,
		success: function(data) {
			if (data.result == 'ok') {
				showMessage('Registration successfull', 'success')
			}
		},
		error: function() {
			showMessage('Server error! Please contact development.', 'danger')
		}
	});
}
