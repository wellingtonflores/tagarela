; ============================================================================
; SCRIPT INNO SETUP OTIMIZADO — INSTALADOR TAGARELA DESKTOP (~68MB)
; ============================================================================

#define MyAppName "Tagarela"
#define MyAppVersion "1.0.2"
#define MyAppPublisher "Equipe Tagarela TCC"
#define MyAppURL "https://github.com/wellingtonflores/tagarela"
#define MyAppExeName "Tagarela.exe"

[Setup]
AppId={{C7892D4A-39A2-4E90-B8E5-1A90E3F32026}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableProgramGroupPage=yes
WizardStyle=modern
SetupIconFile=public\icon.ico
UninstallDisplayIcon={app}\{#MyAppExeName}
OutputDir=dist_installer
OutputBaseFilename=Tagarela-Setup-v1.0.2
Compression=lzma2/ultra64
SolidCompression=yes
PrivilegesRequired=lowest

[Languages]
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
; Copiar arquivos principais ignorando idiomas desnecessários (mantendo apenas pt-BR e en-US)
Source: "dist_app\Tagarela-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Excludes: "locales\af.pak,locales\am.pak,locales\ar.pak,locales\bg.pak,locales\bn.pak,locales\ca.pak,locales\cs.pak,locales\da.pak,locales\de.pak,locales\el.pak,locales\es*.pak,locales\et.pak,locales\fa.pak,locales\fi.pak,locales\fil.pak,locales\fr.pak,locales\gu.pak,locales\he.pak,locales\hi.pak,locales\hr.pak,locales\hu.pak,locales\id.pak,locales\it.pak,locales\ja.pak,locales\kn.pak,locales\ko.pak,locales\lt.pak,locales\lv.pak,locales\ml.pak,locales\mr.pak,locales\ms.pak,locales\nb.pak,locales\nl.pak,locales\pl.pak,locales\ro.pak,locales\ru.pak,locales\sk.pak,locales\sl.pak,locales\sr.pak,locales\sv.pak,locales\sw.pak,locales\ta.pak,locales\te.pak,locales\th.pak,locales\tr.pak,locales\uk.pak,locales\ur.pak,locales\vi.pak,locales\zh*.pak"

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\public\icon.ico"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
