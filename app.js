mermaid.initialize({ startOnLoad: true, securityLevel: 'loose' });

document.addEventListener('DOMContentLoaded', () => {
  const defElement = document.getElementById('graph-definition');
  const graphText = defElement.textContent;
  const adjacency = parseMermaid(graphText);

  function parseMermaid(text) {
    const adj = {};
    const lines = text.split(/\n/);
    lines.forEach(line => {
      const match = line.trim().match(/^([A-Za-z0-9_]+)\s*-->/);
      if(match) {
        const src = match[1];
        const rest = line.split('-->')[1];
        const destMatch = rest.trim().match(/^([A-Za-z0-9_]+)/);
        if(destMatch) {
          const dest = destMatch[1];
          if(!adj[src]) adj[src] = [];
          adj[src].push(dest);
        }
      }
    });
    return adj;
  }

  function clearHighlight() {
    document.querySelectorAll('.node.highlight').forEach(el => el.classList.remove('highlight'));
    document.querySelectorAll('.edgePath.highlight').forEach(el => el.classList.remove('highlight'));
  }

  function highlightDownstream(start) {
    clearHighlight();
    const queue = [start];
    const visited = new Set();
    while(queue.length) {
      const node = queue.shift();
      if(visited.has(node)) continue;
      visited.add(node);
      const nodeEl = document.getElementById(node);
      if(nodeEl) nodeEl.classList.add('highlight');
      (adjacency[node] || []).forEach(dest => {
        const edgeSelector = `[id*="${node}"][id*="${dest}"]`;
        document.querySelectorAll(edgeSelector).forEach(edge => edge.classList.add('highlight'));
        queue.push(dest);
      });
    }
  }

  function attachListeners() {
    document.querySelectorAll('.node').forEach(el => {
      el.addEventListener('click', () => highlightDownstream(el.id));
    });
  }

  setTimeout(attachListeners, 500);
});
