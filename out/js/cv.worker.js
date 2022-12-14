function waitForOpencv(callbackFn, waitTimeMs = 30000, stepTimeMs = 100) {
  if (cv.Mat) callbackFn(true);

  let timeSpentMs = 0;
  const interval = setInterval(() => {
    const limitReached = timeSpentMs > waitTimeMs;
    if (cv.Mat || limitReached) {
      clearInterval(interval);
      return callbackFn(!limitReached);
    } else {
      timeSpentMs += stepTimeMs;
    }
  }, stepTimeMs);
}

onmessage = function (e) {
  switch (e.data.msg) {
    case 'load': {
      // Import Webassembly script
      importScripts('./opencv.js');
      waitForOpencv(function (success) {
        console.log(success, 'what is this?');
        if (success) postMessage({ msg: e.data.msg });
        else throw new Error('Error on loading OpenCV');
      });
      break;
    }
    case 'imageProcessing':
      console.log('running image processing');
      return imageProcessing(e.data);
    default:
      break;
  }
};

/**
 * With OpenCV we have to work with the images as cv.Mat (matrices),
 * so you'll have to transform the ImageData to it.
 */
function imageProcessing({ msg, payload }) {
  const img = cv.matFromImageData(payload);
  let result = new cv.Mat();

  // This converts the image to a greyscale.
  cv.cvtColor(img, result, cv.COLOR_BGR2GRAY);
  postMessage({ msg, payload: imageDataFromMat(result) });
}

/**
 * This function converts again from cv.Mat to ImageData
 */
function imageDataFromMat(mat) {
  // converts the mat type to cv.CV_8U
  const img = new cv.Mat();
  const depth = mat.type() % 8;
  const scale =
    depth <= cv.CV_8S ? 1.0 : depth <= cv.CV_32S ? 1.0 / 256.0 : 255.0;
  const shift = depth === cv.CV_8S || depth === cv.CV_16S ? 128.0 : 0.0;
  mat.convertTo(img, cv.CV_8U, scale, shift);

  // converts the img type to cv.CV_8UC4
  switch (img.type()) {
    case cv.CV_8UC1:
      cv.cvtColor(img, img, cv.COLOR_GRAY2RGBA);
      break;
    case cv.CV_8UC3:
      cv.cvtColor(img, img, cv.COLOR_RGB2RGBA);
      break;
    case cv.CV_8UC4:
      break;
    default:
      throw new Error(
        'Bad number of channels (Source image must have 1, 3 or 4 channels)'
      );
  }
  const clampedArray = new ImageData(
    new Uint8ClampedArray(img.data),
    img.cols,
    img.rows
  );
  img.delete();
  return clampedArray;
}
