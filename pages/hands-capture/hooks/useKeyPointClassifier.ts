import { useEffect, useRef } from 'react';
import { Landmark, Results } from '@mediapipe/hands';
import * as tf from '@tensorflow/tfjs';
import cv, { absdiff, Mat } from '@techstark/opencv-js';
import _ from 'lodash';

const calcBoundingRect = (image, landmarks) => {
  const { width: imageWidth, height: imageHeight } = image;

  const landmarkArray = [];

  Object.values(landmarks).forEach((landmark: Landmark) => {
    const landmarkX = Math.min(landmark.x * imageWidth, imageWidth - 1);
    const landmarkY = Math.min(landmark.y * imageHeight, imageHeight - 1);

    landmarkArray.push(landmarkX);
    landmarkArray.push(landmarkY);
  });

  const mat = cv.matFromArray(landmarks.length, 2, cv.CV_32S, landmarkArray);
  const { x, y, height: h, width: w } = cv.boundingRect(mat);

  return [x, y, x + w, y + h];
};

const calcLandmarkList = (image, landmarks) => {
  const { width: imageWidth, height: imageHeight } = image;

  const landmarkPoint: any = [];

  // Keypoint
  Object.values(landmarks).forEach((landmark: Landmark) => {
    const landmarkX = Math.min(landmark.x * imageWidth, imageWidth - 1);
    const landmarkY = Math.min(landmark.y * imageHeight, imageHeight - 1);

    landmarkPoint.push([landmarkX, landmarkY]);
  });

  return landmarkPoint;
};

const preProcessLandmark = (landmarkList) => {
  let tempLandmarkList = _.cloneDeep(landmarkList);

  let baseX = 0;
  let baseY = 0;

  //convert to realtive coordinates
  Object.values(tempLandmarkList).forEach((landmarkPoint, index) => {
    if (!index) {
      baseX = parseInt(landmarkPoint[0]);
      baseY = parseInt(landmarkPoint[1]);
    }

    tempLandmarkList[index][0] = tempLandmarkList[index][0] - baseX;
    tempLandmarkList[index][1] = tempLandmarkList[index][1] - baseY;
  });

  //convert to one-dimensional list
  tempLandmarkList = _.flatten(tempLandmarkList);

  //normalize
  const maxValue = Math.max(
    ...tempLandmarkList.map((value) => Math.abs(value))
  );
  tempLandmarkList = tempLandmarkList.map((value) => value / maxValue);
  return tempLandmarkList;
};

function useKeyPointClassifier() {
  const model = useRef<any>();

  const keyPointClassifier = (landmarkList) => {
    const result = model.current.execute(tf.tensor2d([landmarkList])).print();

    console.log(result, 'what is this');
  };

  const processLandmark = async (results: Results) => {
    model.current = await tf.loadGraphModel(
      '/tf-models/key-point-classifier/model.json'
    );

    _.zip(results.multiHandLandmarks, results.multiHandedness).forEach(
      ([handLandmarks, handedness]) => {
        // Bounding box calculation
        const brect = calcBoundingRect(results.image, handLandmarks);

        const landmarkList = calcLandmarkList(results.image, handLandmarks);
        const preProcessedLandmarkList = preProcessLandmark(landmarkList);
        const handSignId = keyPointClassifier(preProcessedLandmarkList);
      }
    );
  };

  return { processLandmark };
}

export default useKeyPointClassifier;
