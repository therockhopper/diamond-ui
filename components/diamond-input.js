import {LitElement, html, css} from 'lit-element';

export class DiamondInput extends LitElement {
  static get properties() {
    return {
      disabled: {type: Boolean},
      placeholder: {type: String},
    };
  }

  static get styles() {
    return css`
      .diamondInput {
        display: flex;
        height: 1.2rem;
        width: 12rem;
        padding: 0.5rem;
        background-color: #0f62fe;
        color: #ffffff;
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`
      <input class="diamondInput" ?disabled=${this.disabled}><slot></slot></input>
      `;
  }
}

customElements.define('diamond-input', DiamondInput);
