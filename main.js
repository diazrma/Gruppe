const { app, BrowserWindow } = require('electron');
const path = require('path');
const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 3000
});
let sockets = [];
server.on('connection', function(socket) {

  sockets.push(socket);
  
  socket.on('message', function(msg) {
    sockets.forEach(s => s.send(msg));
  });

  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/logo.ico',
    webPreferences: {
      nodeIntegration:true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
