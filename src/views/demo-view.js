import { html} from 'lit-element';
import { BaseView } from './base-view.js';

// Import components for Demo
import '../../components/diamond-button'

class DemoView extends BaseView {

  render() {
    return html`
      <diamond-button ghost ?disabled=${true}>Hello</diamond-button>
    `;
  }
}

customElements.define('demo-view', DemoView);
