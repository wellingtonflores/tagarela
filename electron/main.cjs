const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

// TRATAMENTO DEFINITIVO DE EVENTOS DO SQUIRREL WINDOWS
if (process.platform === 'win32') {
  const squirrelArg = process.argv.find(arg => arg.startsWith('--squirrel-'));
  if (squirrelArg) {
    // Se foi chamado pelo instalador com argumentos do Squirrel, encerra sem abrir GUI
    app.quit();
  }
}

// OTIMIZAÇÕES DE PERFORMANCE E ACELERAÇÃO DE HARDWARE GPU
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('ignore-gpu-blocklist');

let mainWindow;

function createWindow() {
  const isDev = Boolean(process.env.VITE_DEV_SERVER_URL) && !app.isPackaged;

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 720,
    title: 'Tagarela — Terapia Fonoaudiológica para TEA',
    autoHideMenuBar: true,
    fullscreen: false,
    show: false, // Evita flash em branco ao abrir
    backgroundColor: '#F4F7F6',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      devTools: isDev, // Desativa devTools estritamente em produção
      backgroundThrottling: false, // Evita travamentos de áudio/animação ao mudar de foco
    },
    icon: path.join(__dirname, '../public/icon.jpg')
  });

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // CARREGAMENTO ESTRITO DO BUNDLE COMPILADO DE PRODUÇÃO (file://)
    const indexPath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadFile(indexPath);
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Travar atalhos de saída no Windows durante execução kiosk
  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+W', () => {
      console.log('Atalho de fechamento mantido sob controle do Tagarela');
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
