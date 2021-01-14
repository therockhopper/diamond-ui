import {LitElement, html, css} from 'lit-element';

export class DiamondModal extends LitElement {
  static get properties() {
    return {
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`
      <div>
        <div>Header</div>
        <div>Body</div>
        <div>Footer</div>
      </div>
    `;
  }
}

customElements.define('diamond-modal', DiamondModal);
