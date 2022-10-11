import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function useKeyPointClassifier() {
  const testScript = () => {
    // Define a model for linear regression.
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

    // Train the model using the data.
    model.fit(xs, ys, { epochs: 10 }).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      model.predict(tf.tensor2d([5], [1, 1])).print();
      // Open the browser devtools to see the output
    });
  };

  const preProcessLandmark = (landmarkList) => {};

  const loadGraphModel = (restuts) => {
    const model = tf.loadGraphModel('/*******/model.json'); // remember to add the correct model here

    console.log('load graph model test');
  };

  useEffect(() => {
    console.log('testing keypoinclassifier');
    testScript();
    // loadGraphModel();
  }, []);

  return { loadGraphModel };
}

export default useKeyPointClassifier;
