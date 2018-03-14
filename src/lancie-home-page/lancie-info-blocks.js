import '../../../../@polymer/polymer/polymer.js';
import { Element } from '../../../../@polymer/polymer/polymer-element.js';

class LancieInfoBlocks extends Element {
  static get template() {
    return `
  <style>
  :host {
    display: block;
    background-color: var(--primary-color);
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    max-width: 1032px;
    margin: 0 auto;
    justify-content: space-around;
  }

  .container > div::before {
    min-width: 36px;
    min-height: 36px;
    border-radius: 50%;
    margin: auto 16px auto 0;
    border: 4px solid var(--secondary-color);
    background: transparent;
    content: "";
  }

  .container > div {
    display: flex;
    min-width: 250px;
    color: var(--secondary-color);
    padding: 20px 0;
  }

  .container h2 {
    font-size: 20px;
    font-weight: 400;
    margin: 0 0 8px;
  }

  .container span {
    color: white;
  }
  </style>

  <div class="container">
    <template is="dom-repeat" items="[[texts]]">
      <div>
        <div>
          <h2>[[item.header]]</h2>
          <span>[[item.text]]</span>
        </div>
      </div>
    </template>
  </div>
`;
  }

  static get is() {
    return 'lancie-info-blocks';
  }

  static get properties() {
    return {
      texts: {
        type: Object,
        value: function() {
          return [{
              header: 'Sports & Culture',
              text: 'Mekelweg 8, Delft',
            },{
              header: 'Many tournaments',
              text: 'Win amazing prizes!',
            },{
              header: '220 seats',
              text: 'Sit with friends',
            },{
              header: '€40,- all-in access',
              text: 'Meals and stay included',
            }];
        }
      }
    };
  }
}

customElements.define(LancieInfoBlocks.is, LancieInfoBlocks);
