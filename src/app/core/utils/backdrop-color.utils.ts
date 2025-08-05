//service lấy màu trung tính của img
export function getBackdropGradientFromImage(
  imageUrl: string,
  callback: (gradient: string) => void
): void {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imageUrl;

  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2D context');

      // Resize để xử lý nhanh
      const width = (canvas.width = 10);
      const height = (canvas.height = 10);
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i]; // Red
        g += data[i + 1]; // Green
        b += data[i + 2]; // Blue
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      const gradient = `
        linear-gradient(
          to right,
          rgba(${r}, ${g}, ${b}, 1) calc((50vw - 170px) - 340px),
          rgba(${r}, ${g}, ${b}, 0.84) 50%,
          rgba(${r}, ${g}, ${b}, 0.84) 100%
        )
      `.trim();

      callback(gradient);
    } catch (err) {
      console.error('Failed to calculate average color:', err);
      callback('');
    }
  };

  img.onerror = () => {
    console.error('Failed to load image:', imageUrl);
    callback('');
  };
}
