import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/paper-card/paper-card.js';
import './lancie-ticket-item.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';

Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment">
    :host {
      display: block;
      flex: 3;
    }

    [hidden] {
      display: none !important;
    }

    lancie-ticket-item {
      flex: 1;
      flex-basis: 200px;
    }

    h2 {
      margin-top: 8px;
    }
    </style>

    <h2>Tickets</h2>
    <div class="card-content layout horizontal wrap">
      <template id="tickets" is="dom-repeat" items="[[tickets]]">
        <lancie-ticket-item ticket="[[item]]" basket="[[basket]]" color="[[_getColorClass(index)]]"></lancie-ticket-item>
      </template>

      <p hidden="[[tickets.length]]">Currently there are no tickets available.</p>
    </div>
`,

  is: 'lancie-tickets',

  properties: {
    tickets: Object,
    basket: Object,
    colors: {
      type: Array,
      value: function() {
        return [
          'red',
          'blue',
          'green',
          'purple',
          'orange',
        ];
      },
    },
  },

  _getColorClass: function(index) {
    return this.colors[index % this.colors.length];
  }
});
