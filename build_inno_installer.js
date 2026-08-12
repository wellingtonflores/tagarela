import innosetup from 'innosetup-compiler';
import path from 'path';
import fs from 'fs';

const issPath = path.resolve('tagarela_installer.iss');
const outDir = path.resolve('dist_installer');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Iniciando compilação do Instalador Moderno Windows (Inno Setup)...');

innosetup(issPath, { gui: false, verbose: true }, function (err) {
  if (err) {
    console.error('Erro na compilação do Inno Setup:', err);
  } else {
    console.log('✅ Instalador Moderno Tagarela-Setup.exe gerado com sucesso em: dist_installer/Tagarela-Setup.exe');
  }
});
