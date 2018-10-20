var socket;
var r = 0;
var g = 0;
var b = 0;
function setup(){
    createCanvas(2000,800);
	background('#acacac');
    socket = io.connect();
    socket.on('mouse', function (data){
        fill(r,g,b);
        ellipse(data.x, data.y, 40, 40);
        r += 15;
        g += 10;
        b += 5;
    if (r > 255) {
        r = 0;
        g = 0;
        b = 0;
    }
    return false;
    })
}
function draw() {
}
function mouseDragged() {
    fill(r,g,b);
    var data = {
        x:mouseX,
        y:mouseY
    }
    socket.emit("mouse", data);
    ellipse(mouseX, mouseY, 20, 20);
        r += 5;
        g += 10;
        b += 15;
    if (r > 255) {
        r = 0;
        g = 0;
        b = 0;
    }
    return false;
  }
  function main() {
    
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit')


    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;

    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
    }
    socket.on('display message', handleMessage);
}
window.onload = main;