$(document).ready(function () {
    let $window = $(window);
    let $loginpage = $(".login.page");
    let $usernameInput = $(".usernameInput");
    let $chatpage = $(".chat.page");
    let $inputMessage = $(".inputMessage");
    let $usernameButton = $(".login.page .form .button");
    var $chatBox = $('.chatBox')
    let $currentInput = $inputMessage;
    let username;
    let room = "Guest";
    let socket = io();
    //login page
    $loginpage.click(() => {
        $usernameInput.focus();
    });
    if (!window.sessionStorage.getItem('name')) {
        $usernameButton.click(function (e) {
            if ($usernameInput.val()) {
                username = $usernameInput.val();
                console.log(username);
                socket.emit('join', { msg: "", name: username, room: room });
                window.sessionStorage.setItem('name', username);
                $loginpage.fadeOut("fast");
                $chatpage.fadeIn("fast");
                $currentInput = $inputMessage.focus();
            }
        })
    } else {
        $loginpage.fadeOut("fast");
        $chatpage.fadeIn("fast");

        username = window.sessionStorage.getItem('name');
        socket.emit('join', { msg: "", name: username, room: room });
        console.log(username);
    }
    // messpage
    function sendMessage() {
        let messsage = {
            msg: $inputMessage.val(),
            name: username,
            room: room
        }
        $inputMessage.val("");
        socket.emit("newMessage", messsage)
    }
    function addNewMess(data) {
        let pos = data.name == username ? "right" : "left";
        $chatBox.append(`<li class="userType"> <div  class="${pos}">${data.name}</div><div class="messagesBoxSelf ${pos}">${data.msg}</div></li>`)
        $chatBox[0].scrollTop = $chatBox[0].scrollHeight;
    }
    $window.keydown(event => {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            console.log("Aaa");
            if (username) {
                if ($inputMessage.val().trim().length != 0) {
                    sendMessage();
                    socket.emit('stop typing');
                    typing = false;
                }
            } else {
                setUsername();
            }
        }
    });
    $window.on('unload', function () {
        socket.emit('close', { name: username, room: room })
    })
    socket.on("newMessage", data => {
        addNewMess(data);
    })
    function updateParticipants() {
        socket.emit("clientCount", function (data) {
            console.log(data.count);
        })
    }
    socket.on("join", data => {
        $(".chatBox").append(`<li><div class="center">${data.msg}</div><li>`);
    })
});