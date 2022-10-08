import { useEffect, useRef, useState } from 'react';
import cv from '../services/cv';
import hands from '../services/hands';

// We'll limit the processing size to 200px.
const maxVideoSize = 200;

/**
 * What we're going to render is:
 *
 * 1. A video component so the user can see what's on the camera.
 *
 * 2. A button to generate an image of the video, load OpenCV and
 * process the image.
 *
 * 3. A canvas to allow us to capture the image of the video and
 * show it to the user.
 */
export default function Page() {
  const [processing, updateProcessing] = useState(false);
  const videoElement = useRef(null);
  const canvasEl = useRef(null);

  /**
   * In the onClick event we'll capture a frame within
   * the video to pass it to our service.
   */
  async function onClick() {
    updateProcessing(true);
    await hands.load();

    const ctx = canvasEl.current.getContext('2d');
    ctx.drawImage(videoElement.current, 0, 0, maxVideoSize, maxVideoSize);
    const image = ctx.getImageData(0, 0, maxVideoSize, maxVideoSize);
    // Processing image
    const processedImage = await hands.imageProcessing(image);

    // Render the processed image to the canvas
    console.log(processedImage, 'this si the processedImage');
    // ctx.putImageData(processedImage.data.payload, 0, 0);
    updateProcessing(false);
  }

  // async function onClick() {
  //   await hands.load();
  // }

  useEffect(() => {
    async function initCamara() {
      videoElement.current.width = maxVideoSize;
      videoElement.current.height = maxVideoSize;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'user',
            width: maxVideoSize,
            height: maxVideoSize,
          },
        });
        videoElement.current.srcObject = stream;
        return new Promise((resolve) => {
          videoElement.current.onloadedmetadata = () => {
            resolve(videoElement.current);
          };
        });
      }
      const errorMessage =
        'This browser does not support video capture, or this device does not have a camera';
      alert(errorMessage);
      return Promise.reject(errorMessage);
    }
    async function load() {
      const videoLoaded = await initCamara();
      videoLoaded.play();
      return videoLoaded;
    }
    load();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <video className='video' playsInline ref={videoElement} />
      <button
        disabled={processing}
        style={{ width: maxVideoSize, padding: 10 }}
        onClick={onClick}
      >
        {processing ? 'Processing...' : 'Take a photo'}
      </button>
      <canvas
        ref={canvasEl}
        width={maxVideoSize}
        height={maxVideoSize}
      ></canvas>
    </div>
  );
}
