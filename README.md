# This is an implementation of the repo:

https://github.com/Kazuhito00/hand-gesture-recognition-using-mediapipe

but in React, and nextJS.
The working demo is deployed in here https://tomasgonzalez.github.io/hand-gesture-recognition-using-mediapipe-in-react/ .

https://user-images.githubusercontent.com/26396804/198848050-095785e7-9a83-444d-91d0-f432eb21a4a4.mp4

I made It because I need it for another project, and thought that It would be a good idea to upload it in this rough form just in case It helps anyone.

## To convert the hdf5 model to tfjs you can use the [tensorflowjs_converter](https://www.tensorflow.org/js/guide/conversion) CLI following command: 
tensorflowjs_converter --input_format keras --output_format tfjs_graph_model model/keypoint_classifier/keypoint_classifier.hdf5 tfjs_model/

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Warning
This project originally was build in `NEXTJS` I migrated it to vite because of `SSR` issues, It should be working now. Although the github pages `CI` Pipeline is not working and also I removed the env variables for the `public` dir prefix so you will have to add it in order to load the gesture recognition model.
