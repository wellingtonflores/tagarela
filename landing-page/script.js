document.addEventListener('DOMContentLoaded', () => {
  const downloadBtnHero = document.getElementById('download-btn-hero');
  const btnTriggerDownload = document.getElementById('btn-trigger-download');
  const downloadStatus = document.getElementById('download-status');

  function triggerRealDownload(e) {
    if (e) e.preventDefault();

    if (downloadStatus) {
      downloadStatus.classList.remove('hidden');
    }

    setTimeout(() => {
      // URL exata do instalador publicado no GitHub Releases v1.0.3
      const downloadUrl = 'https://github.com/wellingtonflores/tagarela/releases/download/v1.0.3/Tagarela-Setup-v1.0.3.exe';
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'Tagarela-Setup-v1.0.3.exe';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1000);
  }

  if (btnTriggerDownload) {
    btnTriggerDownload.addEventListener('click', triggerRealDownload);
  }

  if (downloadBtnHero) {
    downloadBtnHero.addEventListener('click', triggerRealDownload);
  }
});
