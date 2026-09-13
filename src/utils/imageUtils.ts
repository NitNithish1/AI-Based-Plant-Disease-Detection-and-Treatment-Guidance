export interface ProcessedImage {
  base64: string;
  mimeType: string;
  dataUrl: string;
  fileName: string;
  fileSizeBytes: number;
  width: number;
  height: number;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg'];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Unsupported format (${file.type || 'unknown'}). Please upload a JPEG, PNG, or WebP image.`
    };
  }

  const maxSizeBytes = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max allowed size is 10MB.`
    };
  }

  return { valid: true };
}

export async function processImageFile(file: File, maxDimension = 1200): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down if exceeds maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG with 0.88 quality for optimal vision clarity and compact payload
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        const [header, base64] = dataUrl.split(',');
        const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';

        resolve({
          base64,
          mimeType,
          dataUrl,
          fileName: file.name,
          fileSizeBytes: file.size,
          width,
          height
        });
      };

      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

export async function processDataUri(dataUri: string, fileName = 'sample-leaf.jpg'): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const width = img.width || 400;
      const height = img.height || 400;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context error'));
        return;
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const [header, base64] = jpegDataUrl.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';

      resolve({
        base64,
        mimeType,
        dataUrl: jpegDataUrl,
        fileName,
        fileSizeBytes: Math.round((base64.length * 3) / 4),
        width,
        height
      });
    };
    img.onerror = () => reject(new Error('Failed to process preset data URI'));
    img.src = dataUri;
  });
}
