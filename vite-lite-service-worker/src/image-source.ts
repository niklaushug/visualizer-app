import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('image-source')
export class ImageSource extends LitElement {
  @property({type: String})
  title: string = 'Image Source';

  @property({type: String})
  id: string = 'ID';

  @property({type: String})
  image?: string | ArrayBuffer | null

  reader = new FileReader()

  constructor() {
    super();

    this.reader.onload = () => {
      const image = this.reader.result;

      if (this.image) {
        this.image = image
        this.dispatchImageLoadedEvent(this.image)
      }
    };
  }

  render() {
    return html`
      <h3>${ this.title }</h3>
      <p>Images can be replaced but not used in section composition.</p>
      <img src="${ this.image }">
      <input type="file" @change="${this.handleChange}">
    `
  }

  handleChange(e: InputEvent) {
    const filelist = (e.target as HTMLInputElement).files
    if (filelist?.length !== 1 ) { return }
    const image = filelist[0]
    this.reader.readAsDataURL(image)
  }

  dispatchImageLoadedEvent(image: any) {
    const options = {
      detail: {
        id: this.id,
        image: image
      },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('imageLoaded', options));
  }

  static styles = css`
   :host {
      display: block;
      width: 100%;
    }
    
    img {
      max-width: 100%;
      background-color: white;
      background-image:
        linear-gradient(45deg, #ccc 25%, transparent 25%),
        linear-gradient(-45deg, #ccc 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ccc 75%),
        linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size:20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;     
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'image-source': ImageSource
  }
}
