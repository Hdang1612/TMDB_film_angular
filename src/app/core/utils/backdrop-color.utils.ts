// color.utils.ts
import ColorThief from 'colorthief';

export function getBackdropGradientFromImage(
  imageUrl: string,
  callback: (gradient: string) => void
): void {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imageUrl;

  img.onload = () => {
    try {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);

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
      console.error('Failed to extract color from image:', err);
      callback('');
    }
  };

  img.onerror = () => {
    console.error('Failed to load image:', imageUrl);
    callback('');
  };
}
