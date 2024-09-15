export const initMongoDB = async () => {
  try {
    console.log('Mongo connection succefully established!');
  } catch () {
      console.log('Error while setting up mongo connection', e);
      throw e;
  }
};
