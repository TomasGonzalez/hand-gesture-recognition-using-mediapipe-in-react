import { useEffect, useRef } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import {
  drawConnectors,
  drawLandmarks,
  drawRectangle,
  NormalizedRect,
} from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS, Landmark } from '@mediapipe/hands';
import useKeyPointClassifier from '../hooks/useKeyPointClassifier';

const maxVideoWidth = 960;
const maxVideoHeight = 540;

function useLogic() {
  const videoElement = useRef<any>(null);
  const hands = useRef<any>(null);
  const camera = useRef<any>(null);
  const canvasEl = useRef(null);

  const { processLandmark } = useKeyPointClassifier();

  function onResults(results) {
    if (canvasEl.current) {
      if (results.multiHandLandmarks.length) {
        processLandmark(results);
      }
      const ctx = canvasEl.current.getContext('2d');

      ctx.save();
      ctx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
      ctx.drawImage(results.image, 0, 0, maxVideoWidth, maxVideoHeight);

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          const landmarksX = landmarks.map((landmark) => landmark.x);
          const landmarksY = landmarks.map((landmark) => landmark.y);
          drawRectangle(
            ctx,
            {
              xCenter:
                Math.min(...landmarksX) +
                (Math.max(...landmarksX) - Math.min(...landmarksX)) / 2,
              yCenter:
                Math.min(...landmarksY) +
                (Math.max(...landmarksY) - Math.min(...landmarksY)) / 2,
              width: Math.max(...landmarksX) - Math.min(...landmarksX),
              height: Math.max(...landmarksY) - Math.min(...landmarksY),
              rotation: 0,
              rectId: 13,
            },
            {
              fillColor: 'transparent',
              color: '#ff0000',
              lineWidth: 1,
            }
          );
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: '#00ffff',
            lineWidth: 2,
          });
          drawLandmarks(ctx, landmarks, {
            color: '#ffff29',
            lineWidth: 1,
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
  };

  useEffect(() => {
    async function initCamara() {
      camera.current = new Camera(videoElement.current, {
        onFrame: async () => {
          await hands.current.send({ image: videoElement.current });
        },
        width: maxVideoWidth,
        height: maxVideoHeight,
      });
      camera.current.start();
    }

    initCamara();
    loadHands();
  }, []);

  return { maxVideoHeight, maxVideoWidth, canvasEl, videoElement };
}

export default useLogic;
