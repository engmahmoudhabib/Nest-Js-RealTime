import axios from 'axios';

export const getImageB64FromUrl = async (imageUrl: string) => {
  const image = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(image.data).toString('base64');
};
