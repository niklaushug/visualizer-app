import {LitElement, css, html} from 'lit'
import {customElement, state} from 'lit/decorators.js'
import {LOGOS} from './lib/logos'

@customElement('watermark-app')
export class WatermarkApp extends LitElement {
    @state()
    underlyingImage = '/src/assets/2.jpeg'

    @state()
    watermarkImage = '/src/assets/inventage-logo-farbig.png'

    @state()
    generatedImage = 'https://placehold.co/200'

    @state()
    count = 0

    @state()
    worker

    handlePlusOne() {
        this.count += 1
    }

    generate() {
        this.setupWorker()

        try {
            this.worker.postMessage({
                baseImage: this.getBaseImage(),
                watermarkImage: this.getWatermarkImage()
            });
        } catch (error) {
            console.log('WatermarkApp.generate() failed', error);
        }
    }

    getBaseImage() {
        const baseImageObjectUrl = localStorage.getItem('baseImageObjectUrl');
        if (!baseImageObjectUrl) {
            throw new Error('no item with key baseImageObjectUrl found in local Storage');
        }
        if (!this.checkIfBaseImageExist(baseImageObjectUrl)) {
            throw new Error('no Blob available for baseImageObjectUrl');
        }
        return baseImageObjectUrl
    }

    // TODO why does checkIfBaseImageExist not work (check somehow if ObjectUrl is still available, or do use events instead of localStorage)
    async checkIfBaseImageExist(url) {
        const response = await fetch(url);
        if (!response.ok) {
            return false
        }
        return true
        //
        // let exist = true
        // try {
        //     await fetch(url);
        //     console.error(`true`);
        // } catch (error) {
        //     console.error(`false 2`);
        //     exist = false
        // }
        // return exist
    }

    getWatermarkImage() {
        const selectedLogoKey = localStorage.getItem('selectedLogoKey') || '';
        return LOGOS.find((logo) =>
            logo.key === selectedLogoKey
        ).url || LOGOS[0].url;
    }

    setupWorker() {
        if (!this.worker) {
            this.worker = new Worker('./src/lib/worker.js');

            this.worker.addEventListener('message', event => {
                this.generatedImage = event.data
            });
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.worker) {
            this.worker.terminate()
        }
    }

    render() {
        return html`
            <h1>Watermark App</h1>

            <div class="layout-images">
                <base-image-selector></base-image-selector>
                <watermark-selector></watermark-selector>
                <div class="generated-image">
                    <h3>Composition</h3>
                    <p>Composition is based on static files.</p>
                    <button @click="${this.generate}">Generate composition</button>
                    <button @click="${this.handlePlusOne}">Count is ${this.count}</button>
                    <img src="${this.generatedImage}">
                </div>
            </div>
        `
    }

    static styles = css`
    :host {
      display:block;
      width: 100%;
    }
    
    .layout-images {
      display: grid;
      grid-template-columns: repeat(3, 33%);
      gap: 1rem;      
    }
    
    img {
      max-width: 100%
    }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'watermark-app': WatermarkApp
    }
}
