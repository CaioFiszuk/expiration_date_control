const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

exec('node backend/app.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Erro ao iniciar o backend: ${err}`);
    return;
  }
  console.log('Backend iniciado');
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      //preload: path.join(__dirname, 'preload.js'),
    }
  });

  // Carrega o HTML principal
  win.loadFile(path.join(__dirname, 'frontend/dist/index.html'));

   win.webContents.openDevTools(); // debug opcional
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
