const socket = io()

// because of const socket = io(), connection event triggers in server.js

// this socket is client side. and the one in server.js are different.
// we get this function from /socket.io/socket.io.js

// setTimeout(() => {
//     console.log('Connected ' + socket.id)
// }, 2000);

// shows when it connects
socket.on('connect', () => {
    console.log('Connected ' + socket.id)
})

socket.on('chat_rcvd', (data) => {
    $('#chats').append(
        $('<li>').text(
            `${data.username}: ${data.msg}`
        )
    )
})
function erase() {
    document.getElementById("note-textarea").value = "";
  }
var name,message;
$(() => {
    $('#chatbox').hide()

    $('#login').click(() => {
        
            readOutLoud("hello"+$('#username').val()) 
            name=$('#username').val()
        
    })
    $('#login').click(() => {
        socket.emit('login', {
            username: $('#username').val()
        })
    })

    socket.on('loggedin', () => {
        console.log('Login successful')
        $('#loginform').hide()
        $('#chatbox').show()
    })



    $('#send').click(() => {
        console.log('Sending chat')
        message=$('#msg').val()
        console.log(message)
        socket.emit('chat', {msg: $('#msg').val()})
        
        if(audioOutput.checked)
    {
        readOutLoud(name+"has send the message"+message) 
    }
    })
    

  


var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var noteContent = '';
 // speech recognisation innitialization
 try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }
  /*Voice Recognition*/
  recognition.continuous = true;
  recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  
    if(!mobileRepeatBug) {
      noteContent += transcript;
      noteTextarea.val(noteContent);
    }
  };
  
  recognition.onstart = function() { 
    instructions.text('Voice recognition activated. Try speaking into the microphone.');
  }
  
  recognition.onspeechend = function() {
    instructions.text('You were quiet for a while so voice recognition turned itself off.');
  }
  
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      instructions.text('No speech was detected. Try again.');  
    };
  }
  //function of audiochat function
  $('#start-record-btn').on('click', function(e) {
    alert("recorded message will be temporarily stored in textarea so on can edit it in case of unclear recording ");
    if (noteContent.length) {
      noteContent += ' ';
    }
    recognition.start();
  });
  
  
  $('#pause-record-btn').on('click', function(e) {
      alert("conform message on textbox and submit");
    recognition.stop();
    instructions.text('Voice recognition paused.');
    msg.value=noteContent;
  });
  
  noteTextarea.on('input', function() {
    noteContent = $(this).val();
  })
// text to speech function
function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

})
