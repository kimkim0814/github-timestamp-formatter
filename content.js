const updateTimestamps = () => {
  const nodes = Array.from(document.getElementsByTagName('relative-time'));

  for (const node of nodes) {
    const date = new Date(node.getAttribute('datetime'));
    const now = new Date();
    const isWithinOneDay = ((now - date) < 1000 * 60 * 60 * 24);
    if (isWithinOneDay) {
      continue;
    }
    const datetimeStr = date.toLocaleString('ja-JP', { timeZone: 'JST' });
    if (node.innerHTML !== datetimeStr) {
      node.innerHTML = datetimeStr;
    }
    if (node.shadowRoot && node.shadowRoot.innerHTML !== datetimeStr) {
      node.shadowRoot.innerHTML = datetimeStr;
    }
  }
};

// 初回実行
updateTimestamps();

// MutationObserverの設定
const observer = new MutationObserver((mutations) => {
  const shouldUpdate = mutations.some(mutation => mutation.type === 'childList' || mutation.type === 'subtree');
  if (shouldUpdate) {
    updateTimestamps();
  }
});

observer.observe(document.body, { childList: true, subtree: true });