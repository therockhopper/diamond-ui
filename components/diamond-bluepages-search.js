import {LitElement, html, css} from 'lit-element';
import './diamond-avatar';
import debounce from './debounce';

export class DiamondBluePagesSearch extends LitElement {
  static get properties() {
    return {
      isOpen: {type: Boolean},
      placeholder: {type: String},
      results: {type: Array},
      error: {type: String},
      items: {type: Array},
      query: {type: String},
      isLoading: {type: Boolean},
      arrowCounter: {type: Number},
      disabled: {type: Boolean},
      bluePagesURL: {type: String},
    };
  }

  static get styles() {
    return css`
      .diamondBluePagesSearch {
        display: flex;
        position: relative;
        flex-direction: column;
      }

      .diamondInput {
        display: flex;
        flex-direction: column;
        width: 15rem;
        height: 1.2rem;
        border: 2px solid black;
      }

      .diamondBluePagesList {
        position: absolute;
        top: 0;
        padding: 0;
        list-style: none;
        border: 1px solid black;
        width: 15rem;
      }

      .diamondBluePagesListItem {
        color: #000;
        padding: 0.75rem 0.5rem;
        cursor: pointer;
        border: 1px solid red;
      }
      .diamondBluePagesListItem:hover {
        background: #f0f0f0;
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
    this.query = '';
    this.arrowCounter = 0;
    this.isLoading = false;
    this.isOpen = false;
    this.results = [];
    this.bluePagesURL =
      'https://w3-services1.w3-969.ibm.com/myw3/unified-profile/v1/search/user?searchConfig=optimized_search';
  }

  get _dropDown() {
    return this.shadowRoot.querySelector('#diamondBluePagesSearch');
  }

  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise(r => setTimeout(r, 0));
    document.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(evt) {
    const evtOrigin = evt.composedPath()[0];
    const rootElm = this._dropDown;
    if (rootElm && !rootElm.contains(evtOrigin)) {
      this.isOpen = false;
      this.arrowCounter = -1;
    }
  }

  emitSelection(result) {
    const payload = result || this.results[this.arrowCounter];
    let myEvent = new CustomEvent('selection', {
      detail: payload,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
    this.reset();
  }

  onEnter() {
    this.emitSelection();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClick.bind(this));
    super.disconnectedCallback();
  }

  async searchByName(query, rows) {
    const searchRows = rows || 10;
    const searchString = query || '';
    const searchQuery = `&rows=${searchRows}&query=${searchString}`;

    const resp = await fetch(`${this.bluePagesURL}${searchQuery}`);
    if (!resp.ok) {
      throw resp.statusText
    }

    const {results} = await resp.json();
    return results;
  }

  reset() {
    this.query = undefined;
    this.arrowCounter = -1;
    this.isOpen = false;
    this.results = [];
  }

  handleArrowKeys(keyCode) {
    if (keyCode === 40 && this.arrowCounter < this.results.length - 1) {
      // up
      this.arrowCounter = this.arrowCounter + 1;
    } else if (keyCode === 38 && this.arrowCounter > 0) {
      // down
      this.arrowCounter = this.arrowCounter - 1;
    }
  }

  onKeyDown(e) {
    const {keyCode} = e;
    if (keyCode === 38 || keyCode === 40) {
      this.handleArrowKeys(keyCode);
      return; // skip arrow keys
    }

    this.seachBluePages(this.query); // only do most recent query
  }

  seachBluePages(query) {
    // only seach the most recent query
    this.isLoading = true;
    this.isOpen = true;
    this.searchByName(query, 8).then(resp => {
      this.results = resp;
      this.isLoading = false;
    }).catch(e => {
      this.error = true
    });
  }

  render() {
    return html`
      <div class="diamondBluePagesSearch" id="diamondBluePagesSearch">
        <input
          class="diamondInput"
          type="text"
          @keyup="${this.onKeyDown}"
          @input="${e => (this.query = e.target.value)}"
          value="${this.query}"
        />
        ${this.isOpen && !this.disabled
          ? html`
              <ul class="diamondBluePagesList">
                ${this.results.map(result => {
                  return html`
                    <li
                      class="diamondBluePagesListItem"
                      @click="${e => this.emitSelection(result)}"
                    >
                      <diamond-avatar
                        bluepages
                        .uid="${result.uid}"
                      ></diamond-avatar>
                      ${result.nameFull} ${result.nameFull}
                    </li>
                  `;
                })}
              </ul>
            `
            : `No results`}
      </div>
    `;
  }
}

customElements.define('diamond-bluepages-search', DiamondBluePagesSearch);
