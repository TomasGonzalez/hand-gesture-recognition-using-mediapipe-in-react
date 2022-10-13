const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export { prefix };

const CONFIGS = {
  keypointClassifierLabels: ['Open', 'Closed', 'Pointing'],
};

export default CONFIGS;
