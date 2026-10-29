const status = document.querySelector('#connection-status');
const banner = document.querySelector('.app-status');
const install = document.querySelector('#install-app');
const update = document.querySelector('#update-app');
let prompt, ready = false, registration;
function renderStatus() {
  banner.classList.toggle('offline', !navigator.onLine);
  status.textContent = !navigator.onLine ? 'Offline. Your kitchen is still open.' : ready ? 'Your kitchen is ready for offline use.' : 'Your kitchen, wherever you are.';
}
window.addEventListener('online', renderStatus);
window.addEventListener('offline', renderStatus);
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); prompt = event; install.textContent = 'Install app';
});
window.addEventListener('appinstalled', () => { prompt = null; install.hidden = true; });
if (matchMedia('(display-mode: standalone)').matches) install.hidden = true;
install.onclick = async () => {
  if (prompt) {
    const current = prompt; prompt = null;
    await current.prompt(); await current.userChoice;
    install.textContent = 'Install guide';
    return;
  }
  document.querySelector('#info-content').innerHTML = '<button class="info-close" aria-label="Close install guide">×</button><h2 id="info-title">A home for your kitchen.</h2><ol class="install-instructions"><li>On Android, open this site in Chrome. Use the browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>, when offered.</li><li>On iPhone or iPad, open in Safari. Tap Share, then <strong>Add to Home Screen</strong>.</li><li>Stay online for the first visit until the status says your kitchen is ready for offline use. Recipes and lists then work without a connection.</li></ol><p>Installation options depend on your browser. Offline use requires HTTPS or a local development server. Your pantry, plan, and shopping checks are stored on this device; clearing browser site data removes them.</p>';
  document.querySelector('#info-content .info-close').onclick = () => document.querySelector('#info-dialog').close();
  document.querySelector('#info-dialog').showModal();
};
function showUpdate() { if (registration.waiting) update.hidden = false; }
update.onclick = () => { update.disabled = true; registration?.waiting?.postMessage('ACTIVATE_UPDATE'); };
if ('serviceWorker' in navigator && window.isSecureContext) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!update.hidden && !refreshing) { refreshing = true; location.reload(); }
  });
  navigator.serviceWorker.register('./sw.js', { type: 'module', scope: './' }).then(async result => {
    registration = result; showUpdate();
    result.addEventListener('updatefound', () => result.installing?.addEventListener('statechange', showUpdate));
    await navigator.serviceWorker.ready;
    ready = true; renderStatus();
  }).catch(() => { status.textContent = navigator.onLine ? 'Offline setup could not finish. Reconnect and reload to try again.' : 'Offline setup is unavailable on this visit.'; });
}
renderStatus();
