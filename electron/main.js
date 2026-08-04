const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 720,
    title: 'Tagarela — Terapia Fonoaudiológica para TEA',
    autoHideMenuBar: true,
    fullscreen: false, // Pode ser ativado via kiosk no modo criança
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    icon: path.join(__dirname, '../public/favicon.svg')
  });

  const startUrl = process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, '../dist/index.html')}`;

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Travar atalhos perigosos de saída no Windows durante execução kiosk (Alt+F4)
  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+W', () => {
      console.log('Atalho de fechamento travado pelo Kiosk Tagarela');
    });
  });

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
