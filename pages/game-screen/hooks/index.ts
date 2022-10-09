import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { useEffect, useRef, useState } from 'react';

const maxVideoSize = 200;

function useLogic() {
  const [processing, updateProcessing] = useState(false);
  const videoElement = useRef<any>(null);
  const hands = useRef<any>(null);
  const camera = useRef<any>(null);
  const canvasEl = useRef(null);

  function onResults(results) {
    if (canvasEl.current) {
      const ctx = canvasEl.current.getContext('2d');

      ctx.save();
      ctx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
      ctx.drawImage(
        results.image,
        0,
        0,
        canvasEl.current.width,
        canvasEl.current.height
      );
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: '#00ffff',
            lineWidth: 5,
          });
          drawLandmarks(ctx, landmarks, {
            color: '#ffff29',
            lineWidth: 2,
          });
        }
      }
      ctx.restore();
    }
  }

  const loadHands = () => {
    hands.current = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.current.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.current.onResults(onResults);
    console.log('test');
  };

  useEffect(() => {
    async function initCamara() {
      camera.current = new Camera(videoElement.current, {
        onFrame: async () => {
          await hands.current.send({ image: videoElement.current });
        },
        width: maxVideoSize,
        height: maxVideoSize,
      });
      camera.current.start();
    }

    initCamara();
    loadHands();
  }, []);

  return { maxVideoSize, canvasEl, videoElement, processing };
}

export default useLogic;
