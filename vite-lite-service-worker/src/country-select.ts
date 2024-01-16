import { LitElement, html, property } from 'lit-element';

type Country = {
  value: string,
  label: string
}

class CountrySelect extends LitElement {
  @property({ type: String })
  selectedCountry = '';

  options: Country[] = [
    { value: 'spain', label: 'Spain' },
    { value: 'france', label: 'France' },
    { value: 'italy', label: 'Italy' },
    { value: 'germany', label: 'Germany' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  static get properties() {
    return {
      options: { type: Array }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
        ${this.options.map(option => html`
          <label>
            <input type="radio" name="country" value=${option.value} @change=${this._onCountrySelect}>
            ${option.label}
          </label>
        `)}
      `;
  }

  _onCountrySelect(event) {
    this.selectedCountry = event.target.value;
    console.log(`Selected country: ${this.selectedCountry}`);
  }
}

customElements.define('country-select', CountrySelect);

