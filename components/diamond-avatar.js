import {LitElement, html, css} from 'lit-element';

export class DiamondAvatar extends LitElement {
  static get properties() {
    return {
      uid: {type: String},
      bluePages: {type: Boolean},
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.uid = undefined;
    this.bluePages = false
  }

  render() {
    return html`
    ${this.uid}
      `;
  }
}

customElements.define('diamond-avatar', DiamondAvatar);
