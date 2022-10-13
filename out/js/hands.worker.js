// import * as comlink from 'comlink';
importScripts('@mediapipe/hands/hands.js');
// importScripts(
//   'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1635986972/hands.js'
// );
let hands;

async function loadModel(e) {
  hands = new this.Hands({
    locateFile: (file, base) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.VERSION}/${file}`;
    },
  });

  hands.setOptions({
    modelComplexity: 1,
    maxNumHands: 2,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  await hands.initialize();

  hands.onResults((results) => {
    postMessage({ msg, payload: result });
  });

  postMessage({ msg: e.data.msg });
}

onmessage = function (e) {
  switch (e.data.msg) {
    case 'load': {
      loadModel(e);
      break;
    }
    case 'imageProcessing':
      console.log(e.data, 'running image processing');
      console.log('is this loading 5');
      return hands.send({ image: e.data.payload });
    default:
      break;
  }
};
