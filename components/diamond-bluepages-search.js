import {LitElement, html, css} from 'lit-element';

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const site =
  'https://w3-services1.w3-969.ibm.com/myw3/unified-profile/v1/search/user?searchConfig=optimized_search';

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
    };
  }

  static get styles() {
    return css`
      .diamondInput {
        display: flex;
        width: 12rem;
        height: 1.2rem;
        border: 2px solid black;
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
    this.query = undefined;
    this.arrowCounter = 0;
    this.isLoading = false;
    this.isOpen = false;
  }

  async searchByName(query, rows) {
    const searchRows = rows || 10;
    const searchString = search || '';
    const searchQuery = `&rows=${searchRows}&query=${searchString}`;

    const resp = await fetch(`${site}${searchQuery}`);

    if (resp && resp.ok) {
      const {results} = await resp.json();
      return results;
    } else {
      return null;
    }
  }

  reset() {
    this.search = undefined;
    this.arrowCounter = -1;
    this.isOpen = false;
  }

  onArrowUp() {
    if (this.arrowCounter > 0) {
      this.arrowCounter = this.arrowCounter - 1;
    }
  }

  onEnter() {
    const event = new CustomEvent('on-select', {
      user: this.results[this.arrowCounter],
    });
    this.dispatchEvent(event);
    this.reset();
  }

  onKeyDown(e) {
    // ignore empty search
    this.isLoading = false;
    this.isOpen = false;

    const search = debounce((query) => {
      // All the taxing stuff you do
      if (this.query === query) {
        console.log(query)
        // only seach the most recent query
        this.isLoading = true;
        this.isOpen = true
        this.searchByName(query, 8).then(resp => {
          console.log(resp)
          this.results = resp;
          this.isLoading = false;
        })
      }
    }, 250);
    search(this.query);
  }

  connectedCallback() {
    super.connectedCallback();
    //window.addEventListener('resize', );
  }
  disconnectedCallback() {
    //window.removeEventListener('resize',);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div>
        <h1>Blue Pages ${this.query}</h1>
        <input
          class="diamondInput"
          type="text"
          @keydown="${this.onKeyDown}"
          @input="${ e => this.query = e.target.value}"
          value="${this.query}"
        />
        ${this.isOpen && !this.disabled
          ? html`
              <ul
                id="autocomplete-results"
                class="absolute left-0 pt-4 w-full overflow-auto z-10"
              >
                ${this.results.map((result, i) => {
                  html`
                    <li
                      class="flex items-center px-2 py-3 w-full cursor-pointer"
                    >
                      ${result.nameFull}
                    </li>
                  `;
                })}}
              </ul>
            `
            : ``}
      </div>
    `;
  }
}

customElements.define('diamond-bluepages-search', DiamondBluePagesSearch);
