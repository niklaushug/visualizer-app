import {Watermark} from "./mark.js";

const watermark = new Watermark()

const queue = [
  ['../assets/photos/17.jpg', '../assets/logos/inventage-bildmarke-farbe.png'],
  ['../assets/photos/2.jpeg', '../assets/logos/inventage-logo-weiss.png'],
  ['../assets/photos/2.jpeg', '../assets/logos/inventage-bildmarke-farbe.png'],
  ['../assets/photos/17.jpg', '../assets/logos/inventage-logo-weiss.png']
]

for (const [underlay , overlay] of queue) {
  watermark.resize(underlay, overlay)
    .then((image) => writeImageToDisk(image))
    .catch((error) => console.log('Watermark.resize() failed', error))
}

function writeImageToDisk(image) {
  image.writeAsync(`../output/${Date.now()}.png`)
}


