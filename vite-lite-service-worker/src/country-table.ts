import { LitElement, css, html, property } from 'lit-element';
const countries = [
  {
    code: "ES",
    name: "Spain",
    languages: [
      { code: "es", name: "Spanish", speakers: 46900000 },
      { code: "ca", name: "Catalan", speakers: 9500000 },
      { code: "gl", name: "Galician", speakers: 2700000 },
      { code: "eu", name: "Basque", speakers: 700000 }
    ],
    population: 46940000
  },
  {
    code: "FR",
    name: "France",
    languages: [
      { code: "fr", name: "French", speakers: 67000000 },
      { code: "br", name: "Breton", speakers: 210000 },
      { code: "co", name: "Corsican", speakers: 90000 },
      { code: "oc", name: "Occitan", speakers: 1500000 }
    ],
    population: 66990000
  },
  {
    code: "DE",
    name: "Germany",
    languages: [
      { code: "de", name: "German", speakers: 76000000 },
      { code: "da", name: "Danish", speakers: 50000 },
      { code: "frs", name: "East Frisian Low Saxon", speakers: 200000 },
      { code: "hsb", name: "Upper Sorbian", speakers: 15000 }
    ],
    population: 83020000
  },
  {
    code: "IT",
    name: "Italy",
    languages: [
      { code: "it", name: "Italian", speakers: 59000000 },
      { code: "co", name: "Corsican", speakers: 190000 },
      { code: "de", name: "German", speakers: 315000 },
      { code: "fr", name: "French", speakers: 130000 }
    ],
    population: 60360000
  },
  {
    code: "PT",
    name: "Portugal",
    languages: [
      { code: "pt", name: "Portuguese", speakers: 10500000 },
      { code: "gl", name: "Galician", speakers: 320000 },
      { code: "mwl", name: "Mirandese", speakers: 15000 }
    ],
    population: 10280000
  },
  {
    code: "CH",
    name: "Switzerland",
    languages: [
      { code: "de", name: "German", speakers: 5900000 },
      { code: "fr", name: "French", speakers: 1945000 },
      { code: "it", name: "Italian", speakers: 690000 },
      { code: "rm", name: "Romansh", speakers: 60000 }
    ],
    population: 8695000
  }
];

class CountryTable extends LitElement {
  @property({ type: Array })
  countries = countries

  render() {
    return html`
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Population</th>
            <th>Languages</th>
          </tr>
        </thead>
        <tbody>
          ${this.countries.map(country => html`
            <tr>
              <td>${country.code}</td>
              <td>${country.name}</td>
              <td>${country.population}</td>
              <td>
                ${country.languages.map(language => html`
                  <span class="chip">${language.name}</span>
                `)}
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  static get styles() {
    return css`
      .chip {
        display: inline-block;
        padding: 0.25em 0.5em;
        margin-right: 0.25em;
        margin-bottom: 0.25em;
        font-size: 0.8em;
        font-weight: bold;
        background-color: #ccc;
        color: #333;
        border-radius: 1em;
      }
    `;
  }
}

customElements.define('country-table', CountryTable);
