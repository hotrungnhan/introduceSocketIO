function getmsg() {
    return {
        name: $('#name').val(),
        msg: $('#m').val(),
        room: $('#pool').val()
    }
}
function getroom() {
    return { room: $('#pool').val() };
}
$(function () {
    let socket = io();
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('message', getmsg());
        $('#m').val('');
        return false;
    });
    socket.on('message', function (data) {
        $('#feedback').text("");
        if (data.name === undefined) {
            $('#messages').append(`<li>${data.msg}</li>`);
        }
        else {
            $('#messages').append(`<li><strong>${data.name}:</strong>${data.msg}</li>`);
        }
    });
    $('#m').on("click", function () {
        socket.emit('typing', getmsg())
    });
    socket.on('typing', (data) => {
        $('#feedback').html(`<strong>${data.name}</strong> is Typing`);
    })
    $('#pool').change(function () {
        $('#Poolname').text($('#pool').val())
        socket.emit('roomchose', getroom());
    })
});
