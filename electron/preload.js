const { contextBridge } = require('electron');

// Expor APIs nativas seguras para o frontend React
contextBridge.exposeInMainWorld('tagarelaDesktop', {
  platform: process.platform,
  version: '1.0.0',
});
