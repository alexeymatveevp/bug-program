$(function() {
    $('#name_edit').click(function() {
        $(this).hide()
        $('#firstname').val($('#_firstname').html())
        $('#secondname').val($('#_secondname').html())
        $('#firstname').show()
        $('#_firstname').hide()
        $('#secondname').show()
        $('#_secondname').hide()
        $('#name_ok').show()
        $('#name_no').show()
    })
})