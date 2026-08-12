import { createWindowsInstaller } from 'electron-winstaller';
import path from 'path';
import fs from 'fs';

async function buildInstaller() {
  console.log('Iniciando compilação do instalador tradicional Windows Tagarela-Setup.exe...');
  
  const outDir = path.resolve('dist_installer');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    await createWindowsInstaller({
      appDirectory: path.resolve('dist_app/Tagarela-win32-x64'),
      outputDirectory: outDir,
      authors: 'Equipe Tagarela TCC',
      exe: 'Tagarela.exe',
      setupExe: 'Tagarela-Setup.exe',
      description: 'Software Desktop de Terapia Fonoaudiológica para Crianças Autistas (TEA)',
      noMsi: true,
    });
    console.log('✅ Instalador Tagarela-Setup.exe gerado com sucesso em: dist_installer/Tagarela-Setup.exe');
  } catch (e) {
    console.error('Erro ao criar instalador:', e);
  }
}

buildInstaller();
