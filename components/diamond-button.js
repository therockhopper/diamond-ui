import {LitElement, html, css} from 'lit-element';

export class DiamondButton extends LitElement {
  static get properties() {
    return {
      disabled: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      .diamondButton {
        display: flex;
        height: 1.2rem;
        width: 12rem;
        padding: 0.5rem;
        background-color: #0f62fe;
        color: #ffffff;
      }

      :host([secondary]) .diamondButton {
        background-color: #0f62fe;
      }
      :host([tertiary]) .diamondButton {
        background-color: #0f62fe;
      }
      :host([ghost]) .diamondButton {
        background-color: transparent;
        color: #000;
      }
      :host([danger]) .diamondButton {
        background-color: #da1e28;
      }
      :host([lg]) .diamondButton {
        height: 2rem;
        width: 32rem;
        padding: 0.5rem 1rem;
      }
      :host([xl]) .diamondButton {
        height: 2rem;
        width: 64rem;
      }

      .diamondButton:disabled {
        background-color: #8d8d8d;
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`
      <buton class="diamondButton" ?disabled=${this.disabled}><slot></slot></button>
      `;
  }
}

customElements.define('diamond-button', DiamondButton);
