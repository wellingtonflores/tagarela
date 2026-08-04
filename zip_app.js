import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const sourceDir = path.resolve('dist_app/Tagarela-win32-x64');
const zipOutput = path.resolve('landing-page/Tagarela-Windows.zip');

console.log('Criando arquivo ZIP do Tagarela Desktop...');

if (fs.existsSync(zipOutput)) {
  fs.unlinkSync(zipOutput);
}

try {
  const cmd = `powershell -Command "Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('${sourceDir}', '${zipOutput}')"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log('ZIP recriado com sucesso em:', zipOutput);
} catch (e) {
  console.error('Erro ao zipar:', e);
}
