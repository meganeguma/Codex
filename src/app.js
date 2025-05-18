export function calculateROI(gain, cost) {
  if (cost === 0) {
    throw new Error('Cost cannot be zero');
  }
  return ((gain - cost) / cost) * 100;
}

document.addEventListener('DOMContentLoaded', () => {
  const gainInput = document.getElementById('gain');
  const costInput = document.getElementById('cost');
  const result = document.getElementById('result');
  document.getElementById('calc').addEventListener('click', () => {
    const gain = parseFloat(gainInput.value);
    const cost = parseFloat(costInput.value);
    try {
      const roi = calculateROI(gain, cost).toFixed(2);
      result.textContent = `ROI: ${roi}%`;
    } catch (e) {
      result.textContent = e.message;
    }
  });
});
