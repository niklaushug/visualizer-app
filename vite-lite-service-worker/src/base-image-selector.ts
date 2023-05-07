import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('base-image-selector')
export class BaseImageSelector extends LitElement {
  @property({type: String})
  image?: string | ArrayBuffer | null

  @state()
  baseImageObjectUrl

  reader = new FileReader()

  bindReaderOnLoad() {
    this.reader.onload = () => {
      this.image = this.reader.result;
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.bindReaderOnLoad()
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.revokeBaseImageObjectUrl()
    localStorage.removeItem('baseImageObjectUrl')
  }

  revokeBaseImageObjectUrl() {
    if (this.baseImageObjectUrl) {
      URL.revokeObjectURL(this.baseImageObjectUrl)
    }
  }

  render() {
    return html`
      <h3>Base Image Selector</h3>
      <img src="${ this.image }">
      <input type="file" @change="${this.handleChange}">
    `
  }

  handleChange(e: InputEvent) {
    const filelist = (e.target as HTMLInputElement).files
    if (filelist?.length !== 1 ) { return }
    const image = filelist[0]

    this.revokeBaseImageObjectUrl()
    this.baseImageObjectUrl = URL.createObjectURL(image);
    localStorage.setItem('baseImageObjectUrl', this.baseImageObjectUrl);

    this.reader.readAsDataURL(image)
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
    'base-image-selector': BaseImageSelector
  }
}
