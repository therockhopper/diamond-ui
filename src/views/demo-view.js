import { html} from 'lit-element';
import { BaseView } from './base-view.js';

// Import components for Demo
import '../../components/diamond-button'
import '../../components/diamond-input'
import '../../components/diamond-bluepages-search'

class DemoView extends BaseView {

  render() {
    return html`
      <diamond-bluepages-search></diamond-bluepages-search>
    `;
  }
}

customElements.define('demo-view', DemoView);
