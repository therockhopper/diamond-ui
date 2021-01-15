import {LitElement, html, css} from 'lit-element';

export class DiamondAvatar extends LitElement {
  static get properties() {
    return {
      user: {type: Object},
      avatarBaseURL: {type: String},
    };
  }

  static get styles() {
    return css`
      .diamondAvatar {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
      }
    `;
  }

  constructor() {
    super();
    this.uid = undefined;
    this.avatarBaseURL =
      'https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/';
  }

  get imagePath() {
    if (!this.user) return '';
    return this.avatarBaseURL + this.user.uid;
  }

  render() {
    return html`
      <img class="diamondAvatar" .src="${this.imagePath}" />
    `;
  }
}

customElements.define('diamond-avatar', DiamondAvatar);
