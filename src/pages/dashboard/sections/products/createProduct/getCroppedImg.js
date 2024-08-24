// Utility function to convert cropped area to a blob
export default function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // iPhone mockup dimensions
          const mockupWidth = 375;
          const mockupHeight = 812;

          // Adjust the canvas dimensions to fit the mockup aspect ratio
          canvas.width = mockupWidth;
          canvas.height = mockupHeight;

          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;

          // Calculate the crop dimensions and position
          const cropWidth = crop.width * scaleX;
          const cropHeight = crop.height * scaleY;
          const cropX = crop.x * scaleX;
          const cropY = crop.y * scaleY;

          // Draw the cropped image onto the canvas
          ctx.drawImage(
              image,
              cropX,
              cropY,
              cropWidth,
              cropHeight,
              0,
              0,
              mockupWidth,
              mockupHeight
          );

          canvas.toBlob((blob) => {
              if (!blob) {
                  reject(new Error('Canvas is empty'));
                  return;
              }
              const fileUrl = URL.createObjectURL(blob);
              resolve(fileUrl);
          }, 'image/jpeg');
      };

      image.onerror = () => reject(new Error('Failed to load image'));
  });
}
