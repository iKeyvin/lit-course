import { LitElement, html } from 'lit-element';
import { formPeticion } from '../utils/costum-css.js';

class FormPetition extends LitElement {
  static get styles() {
    return [formPeticion];
  }

  static get properties() {
    return {
      listaPeticion: { type: Array },
    };
  }

  constructor() {
    super();
    this.listaPeticion = [];
    this.addPeticion = this.addPeticion.bind(this);
  }

  addPeticion() {
    let storedPeticion = JSON.parse(window.localStorage.getItem('list-peticion'));
    storedPeticion = storedPeticion === null ? [] : storedPeticion;

    const inputTitulo = this.shadowRoot.querySelector('#peticionTitulo');
    const inputDescripcion = this.shadowRoot.querySelector('#peticionDescripcion');
    const inputPublicar = this.shadowRoot.querySelector('#peticionPublicar');

    if (inputTitulo.value.length > 0 && inputDescripcion.value.length > 0) {
      storedPeticion.push({
        id: new Date().valueOf(),
        titulo: inputTitulo.value.toUpperCase(),
        descripcion: inputDescripcion.value,
        fecha: new Date(),
        publicar: inputPublicar.checked,
      });

      localStorage.setItem('list-peticion', JSON.stringify(storedPeticion));
      this.listaPeticion = [...[storedPeticion], ...this.listaPeticion];

      inputTitulo.value = '';
      inputDescripcion.value = '';
      inputPublicar.checked = false;
    }
  }

  render() {
    return html`
      <div class="form">
        <p type="TITULO:"><input id="peticionTitulo" name="peticionTitulo" placeholder="Escribe el titulo.." /></p>
        <p type="DESCRIPCIÓN:">
          <textarea id="peticionDescripcion" name="peticionDescripcion" placeholder="Escribe..."></textarea>
        </p>
        <input id="peticionPublicar" type="checkbox" />
        <label for="c1">PUBLICAR</label>
        <button @click="${() => this.addPeticion()}">ENVIAR</button>
      </div>
    `;
  }
}

window.customElements.define('form-petition', FormPetition);
