import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';


import styles from './base-image-selector.scss?inline';

@customElement('base-image-selector')
export class BaseImageSelector extends LitElement {
  static styles = unsafeCSS(styles);

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
      ${when(this.image, 
        () => html`
          <h3>Selected Base Image</h3>
          <figure  class="image-display">
            <img src="${ this.image }">
          </figure>
        `,
        () => html`
          <h3>Choose Image</h3>
          <label class="image-upload">
            <input type="file" @change="${this.handleChange}">
          </label>
        `)
    }
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
}

declare global {
  interface HTMLElementTagNameMap {
    'base-image-selector': BaseImageSelector
  }
}
