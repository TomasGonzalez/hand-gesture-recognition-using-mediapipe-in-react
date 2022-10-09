import React from 'react';
import useLogic from './hooks/index';

function GameScreen() {
  const { videoElement, maxVideoSize, canvasEl } = useLogic();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <video
        style={{ display: 'none' }}
        className='video'
        playsInline
        ref={videoElement}
      />
      <canvas ref={canvasEl} width={maxVideoSize} height={maxVideoSize} />
    </div>
  );
}

export default GameScreen;
