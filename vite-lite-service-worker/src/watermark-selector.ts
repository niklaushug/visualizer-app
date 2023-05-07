import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { Logo, LOGOS } from './lib/logos'

@customElement('watermark-selector')
export class WatermarkSelector extends LitElement {
  @property({type: Object})
  selectedLogo: Logo = LOGOS[0]

  @state()
  logos = LOGOS

  handleSelection(e: any) {
    const selectedLogoKey = e.target.value;
    this.selectedLogo = this.logos.find((logo) => logo.key === selectedLogoKey) || LOGOS[0]
    localStorage.setItem('selectedLogoKey', this.selectedLogo.key);
  }

  constructor() {
    super();

    const selectedLogoKey = localStorage.getItem('selectedLogoKey');
    if (selectedLogoKey) {
      this.selectedLogo = this.logos.find((logo) => logo.key === selectedLogoKey) || LOGOS[0]
    }
  }

  render() {
    return html`
      <h3>Select Logo</h3>
      
      <select 
        @change=${this.handleSelection}>
        ${this.logos.map((logo) =>
          html`
            <option 
              value=${logo.key}
              ?selected=${logo.key === this.selectedLogo.key}
            >${logo.name}</option>`
        )}
      </select>
      
      <img src="${ this.selectedLogo.url }">
    `
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
    'watermark-selector': WatermarkSelector
  }
}
