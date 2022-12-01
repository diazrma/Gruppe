var term = new Terminal({
    cursorBlink: "block"
});

const ws = new WebSocket("ws://localhost:3000/", "echo-protocol");
let currLine = "";
let entries = [];

term.open(document.getElementById('terminal'));
term.write('Hello Guys! my name is Gruppe  \x1B[1;3;31mʕ◕ᴥ◕ ʔ\x1B[0m $');

term.onData(function (data) {

    term.write(data)

});
