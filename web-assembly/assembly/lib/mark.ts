import '../../node_modules/jimp/browser/lib/jimp'  // import path for Browsers

export class Watermark {
  static OFFSET: number = 100

  static position(image: Jimp, watermark: Jimp): number[] {
    const x = (image.bitmap.width - watermark.bitmap.width) / 2
    const y = (image.bitmap.height - watermark.bitmap.height) / 2
    return [x, y]
  }

  static sizeOfWatermark(image: Jimp): number[] {
    const width = image.bitmap.width - Watermark.OFFSET * 2
    const height = image.bitmap.height - Watermark.OFFSET * 2
    return [width, height]
  }

  async resize(imagePath: string, watermarkPath: string): Jimp {
    const startTime = new Date()

    const image = await Jimp.read(imagePath);
    const watermark = await Jimp.read(watermarkPath);

    await watermark.contain(...Watermark.sizeOfWatermark(image)).autocrop()

    await image.composite(watermark, ...Watermark.position(image, watermark), {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 0.5
    })

    const endTime = new Date()
    console.log(`mark "${imagePath}" with "${watermarkPath}" (${endTime - startTime}ms)`)

    return image
  }
}
