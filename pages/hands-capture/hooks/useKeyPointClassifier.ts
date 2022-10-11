import { useEffect } from 'react';
import { Landmark, Results } from '@mediapipe/hands';
import * as tf from '@tensorflow/tfjs';
import cv, { Mat } from '@techstark/opencv-js';
import _ from 'lodash';

const calcBoundingRect = (image, landmarks) => {
  const { width: imageWidth, height: imageHeight } = image;

  let landmarkArray = [];

  Object.values(landmarks).forEach((landmark: Landmark) => {
    const landmarkX = Math.min(landmark.x * imageWidth, imageWidth - 1);
    const landmarkY = Math.min(landmark.y * imageHeight, imageWidth - 1);

    landmarkArray.push(landmarkX);
    landmarkArray.push(landmarkY);
  });

  const mat = cv.matFromArray(landmarks.length, 2, cv.CV_32S, landmarkArray);
  const { x, y, height: h, width: w } = cv.boundingRect(mat);

  return [x, y, x + w, y + h];
};

const calcLandmarkList = () => {};

function useKeyPointClassifier() {
  const preProcessLandmark = (results: Results) => {
    _.zip(results.multiHandLandmarks, results.multiHandedness).forEach(
      ([handLandmarks, handedness]) => {
        // Bounding box calculation
        const brect = calcBoundingRect(results.image, handLandmarks);
      }
    );
  };

  const loadGraphModel = () => {
    const model = tf.loadGraphModel(
      '/tf-models/key-point-classifier/model.json'
    );
  };

  useEffect(() => {
    // loadGraphModel();
  }, []);

  return { loadGraphModel, preProcessLandmark };
}

export default useKeyPointClassifier;
