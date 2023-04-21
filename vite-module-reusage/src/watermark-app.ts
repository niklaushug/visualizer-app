import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Watermark } from "./lib/mark.js";

@customElement('watermark-app')
export class WatermarkApp extends LitElement {
  @state()
  underlyingImage = '/src/assets/2.jpeg'

  @state()
  watermarkImage = '/src/assets/inventage-logo-farbig.png'

  @state()
  generatedImage = 'https://placehold.co/200'

  watermark = new Watermark()

  render() {
    return html`
      <h1>Watermark App</h1>
      
      <div class="layout-images">
        <div class="underlying-image">
          <image-source 
              title="Underlying image"
              image="/src/assets/2.jpeg"
              id="underlyingImage"
              @imageLoaded="${this.handleImageLoaded}"              
          ></image-source>
        </div>
        
        <div class="watermark-image">
          <image-source 
              title="Watermark Image"
              image="/src/assets/inventage-logo-farbig.png"
              id="watermarkImage"
              @imageLoaded="${this.handleImageLoaded}"
          ></image-source>
        </div>
        
        <div class="generated-image">
          <h3>Composition</h3>
          <p>Composition is based on static files.</p>
          <button @click="${this.generateComposition}">Generate composition</button>
          <img src="${this.generatedImage}">
        </div>
      </div>
    `
  }

  handleImageLoaded(e: CustomEvent) {
    console.log(e.detail)
    switch(e.detail.id) {
      case 'underlyingImage':
        this.underlyingImage = e.detail.image
      case 'watermarkImage':
        this.watermarkImage = e.detail.image
    }

    console.log(this.underlyingImage, this.watermarkImage)
  }

  generateComposition() {
    this.watermark.resize('http://127.0.0.1:5173/src/assets/2.jpeg', 'http://127.0.0.1:5173/src/assets/inventage-logo-farbig.png')
      .then(image => {
        console.log('watermark.resize() successful')
        image.getBase64(Jimp.AUTO, (err, src) => {
          console.log(err, src)
          if (err || !src) { return }
          this.generatedImage = src
        })
      })
      .catch(error => console.log('watermark.resize() failed', error));
  }

  static styles = css`
    .layout-images {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      width: min-content;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'watermark-app': WatermarkApp
  }
}
