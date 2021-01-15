import {html} from 'lit-element';
import {BaseView} from './base-view.js';

// Import components for Demo
import '../../components/diamond-avatar';
import '../../components/diamond-button';
import '../../components/diamond-input';
import '../../components/diamond-bluepages-search';

class DemoView extends BaseView {
  static get properties() {
    return {
      selection: {type: Object},
    };
  }

  constructor() {
    super();
    this.selection = null;
  }

  render() {
    return html`
      ${this.selection
        ? html`
            <diamond-avatar
              bluepages
              .uid="${this.selection.uid}"
            ></diamond-avatar>
          `
        : ''}
      <diamond-bluepages-search
        @selection="${e => (this.selection = e.detail.value)}"
      ></diamond-bluepages-search>
    `;
  }
}

customElements.define('demo-view', DemoView);
