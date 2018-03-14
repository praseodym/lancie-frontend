import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/marked-element/marked-element.js';
import '../../../../@polymer/paper-button/paper-button.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <style>
      :host {
        display: block;
      }
      .description {
        text-align: justify;
        padding-right: 16px;
      }
    </style>

    <div class="content">
      <marked-element markdown="[[data.description]]" class="description"></marked-element>
      <paper-button on-tap="showTermsAndConditions">View terms and conditions</paper-button>
    </div>
`,

  is: 'lancie-activity-content',

  properties: {
    data: {
      type: Object,
      value: {},
      notify: true
    }
  },

  showTermsAndConditions: function() {
    this.dispatchEvent(new CustomEvent('show-terms-and-conditions', {
      bubbles: true,
      composed: true
    }));
  }
});
