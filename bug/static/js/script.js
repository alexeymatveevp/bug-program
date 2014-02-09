function showMessage(message, level) {
    var msg
    if (level == 'success') {
        msg = $('#alert_template_success').clone()
    } else if (level == 'danger') {
        msg = $('#alert_template_danger').clone()
    }
    var top = ($('#alerts').children().length + 1) * 70
    msg.css('top', top)
    msg.find('strong').html(message)
    $('#alerts').append(msg)
    msg.show()
}