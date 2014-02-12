$(function() {
    $('#name_edit').click(function() {
        correctSimpleInput('firstname')
        correctSimpleInput('lastname')
        // hiding showing
        $('#name_edit').hide()
        $('#firstname').val($('#_firstname').html())
        $('#lastname').val($('#_lastname').html())
        $('#firstname').show()
        $('#_firstname').hide()
        $('#lastname').show()
        $('#_lastname').hide()
        $('#name_ok').show()
        $('#name_no').show()
    })
    $('#name_ok').click(function() {
        updateServer('firstname')
        updateServer('lastname')
        $('#name_edit').show()
        $('#firstname').hide()
        $('#_firstname').show()
        $('#lastname').hide()
        $('#_lastname').show()
        $('#name_ok').hide()
        $('#name_no').hide()
    })
    $('#name_no').click(function() {
        $('#name_edit').show()
        $('#firstname').hide()
        $('#_firstname').show()
        $('#lastname').hide()
        $('#_lastname').show()
        $('#name_ok').hide()
        $('#name_no').hide()
    })

    $('#account_edit').click(function() {
        toggleEdit('account', correctSimpleInput)
    })
    $('#account_ok').click(function() {
        updateServer('account')
    })
    $('#account_no').click(function() {
        toggleEditBack('account')
    })
    $('#email_edit').click(function() {
        toggleEdit('email', correctSimpleInput)
    })
    $('#email_ok').click(function() {
        updateServer('email')
    })
    $('#email_no').click(function() {
        toggleEditBack('email')
    })
    $('#bday_edit').click(function() {
        toggleEdit('bday', correctDate)
    })
    $('#bday_ok').click(function() {
        updateServer('bday')
    })
    $('#bday_no').click(function() {
        toggleEditBack('bday')
    })
    $('#position_edit').click(function() {
        toggleEdit('position',correctSelect)
    })
    $('#position_ok').click(function() {
        updateServer('position')
    })
    $('#position_no').click(function() {
        toggleEditBack('position')
    })
    $('#about_edit').click(function() {
        toggleEdit('about', correctSimpleInput)
    })
    $('#about_ok').click(function() {
        updateServer('about')
    })
    $('#about_no').click(function() {
        toggleEditBack('about')
    })

    // datepicker
    $('#bday').datepicker({
        format: "mm/dd/yyyy",
        startDate: '01/01/1950',
        startView: 'year'
    })

    $('#user_data').validate({
        rules: {
            account: {
                required: true,
                maxlength: 30
            },
            firstname: {
                required: true,
                maxlength: 20
            },
            lastname: {
                maxlength: 20
            },
            email: {
                required: true,
                email: true,
                maxlength: 40
            },
            bday: {
                required: true,
                date: true
            },
            position: {
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
            $(element).closest('dd').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('dd').removeClass('has-error');
        }
    })
})

function toggleEdit(prefix, input_correct, ok_action) {
    input_correct(prefix)
    // hiding showing
    $('#'+prefix+'_edit').hide()
    $('#'+prefix).show()
    $('#_'+prefix).hide()
    $('#'+prefix+'_ok').show()
    $('#'+prefix+'_no').show()
}

function toggleEditBack(prefix) {
    $('#_'+prefix).html($('#'+prefix).val())
    $('#'+prefix+'_edit').show()
    $('#'+prefix).hide()
    $('#_'+prefix).show()
    $('#'+prefix+'_ok').hide()
    $('#'+prefix+'_no').hide()
}

function correctSimpleInput(prefix) {
    // width calculation
    var SHIFT = 30
    var fnw = $('#_'+prefix).width()
    $('#'+prefix).css('width' , fnw + SHIFT)
    $('#'+prefix).css('display', 'inline')
    $('#'+prefix).val($('#_'+prefix).html())
}

function correctDate(prefix) {
    var cur = $('#_'+prefix).html()
    $('#'+prefix).val(moment(cur,'MMM. D, YYYY').format('L'))
    $('#'+prefix).css('width' , '100px')
}

function correctSelect(prefix) {
    var cur = $('#_'+prefix).val()
    $('#'+prefix).val(cur)
    $('#'+prefix).css('width' , '200px')
}

function updateServer(prefix) {
    var data = ''+prefix+'='+$('#'+prefix).val()
    $.ajax({
        type: "POST",
        url: '/user/'+$('#_account').html()+'/',
        data: data,
        async: false,
        success: function(data) {
            if (data.result == 'ok') {
                showMessage('Person '+prefix+' successfully updated', 'success')
            }
        },
        error: function() {
            showMessage('Server error! Please contact development.', 'danger')
        }
    })
    toggleEditBack(prefix)
}