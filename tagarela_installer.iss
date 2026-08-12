; ============================================================================
; SCRIPT INNO SETUP — INSTALADOR MODERNO TAGARELA DESKTOP
; ============================================================================

#define MyAppName "Tagarela"
#define MyAppVersion "1.0.0"
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
UninstallDisplayIcon={app}\{#MyAppExeName}
OutputDir=dist_installer
OutputBaseFilename=Tagarela-Setup
Compression=lzma2/max
SolidCompression=yes
PrivilegesRequired=lowest

[Languages]
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "dist_app\Tagarela-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
