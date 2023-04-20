import Jimp from 'npm:jimp'

export class Watermark {
  static OFFSET = 100

  private static position(image: Jimp, watermark: Jimp): [number, number] {
    const x = (image.bitmap.width - watermark.bitmap.width) / 2
    const y = (image.bitmap.height - watermark.bitmap.height) / 2
    return [x, y]
  }

  private static sizeOfWatermark(image: Jimp): [number, number] {
    const width = image.bitmap.width - Watermark.OFFSET * 2
    const height = image.bitmap.height - Watermark.OFFSET * 2
    return [width, height]
  }

  public async resize(imagePath: string, watermarkPath: string) {
    const startTime: Date = new Date()

    const image: Jimp = await Jimp.read(imagePath);
    const watermark: Jimp = await Jimp.read(watermarkPath);

    await watermark.contain(...Watermark.sizeOfWatermark(image)).autocrop()

    await image.composite(watermark, ...Watermark.position(image, watermark), {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 0.5
    })

    await image.writeAsync(`../output/${Date.now()}.png`);

    const endTime = new Date()
    console.log(`mark "${imagePath}" with "${watermarkPath}" (${endTime.getTime() - startTime.getTime()}ms)`)
  }
}
