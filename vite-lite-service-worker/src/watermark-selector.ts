import {LitElement, css, html, unsafeCSS} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'

import {Logo, LOGOS} from './lib/logos'
import styles from './watermark-selector.scss?inline';

@customElement('watermark-selector')
export class WatermarkSelector extends LitElement {
  static styles = unsafeCSS(styles)

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

      <div
        class="watermark-selector">
        ${this.logos.map((logo) =>
          html`
            <label class="watermark-option">
              <input
                class="radio"
                name="watermark"
                type="radio">
              <img
                class="image"
                src=${logo.url}
                alt="${logo.name}"
                ?selected=${logo.key === this.selectedLogo.key}
              />
              <span class="name">${logo.name}</span>
            </label>
          `
        )}
      </div>
    `
  }
}

// TODO Update selection on click
// @click=${this.handleSelection}

// TODO use saved key to mark selected watermark of last session
// ?selected=${logo.key === this.selectedLogo.key}

declare global {
  interface HTMLElementTagNameMap {
    'watermark-selector': WatermarkSelector
  }
}
