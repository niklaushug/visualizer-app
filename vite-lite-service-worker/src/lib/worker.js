importScripts('mark.js');
const watermark = new Watermark()

self.onmessage = async (event) => {
  try {
    const {
      baseImage,
      watermarkImage
    } = event.data
    const generatedImage = await watermark.combine(baseImage, watermarkImage)
    const base64 = await generatedImage.getBase64Async(Jimp.AUTO)
    self.postMessage(base64);
  } catch (error) {
    console.log('watermark.resize() failed', error);
  }
}
