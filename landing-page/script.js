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
      const downloadUrl = 'https://github.com/wellingtonflores/tagarela/releases/download/v1.0.0/Tagarela-Windows.zip';
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'Tagarela-Windows.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1200);
  }

  if (btnTriggerDownload) {
    btnTriggerDownload.addEventListener('click', triggerRealDownload);
  }

  if (downloadBtnHero) {
    downloadBtnHero.addEventListener('click', triggerRealDownload);
  }
});
