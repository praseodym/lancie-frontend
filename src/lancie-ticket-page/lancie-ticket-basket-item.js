import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../@polymer/iron-icons/iron-icons.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';

Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
        width: 100%;
      }

      .container {
        padding: 8px;
      }

      .price {
        font-size: 24px;
        font-weight: 100;
      }

      .secondary {
        color: #888888;
        font-size: 12px;
        margin-top: 4px;
      }

      iron-icon {
        margin-left: 8px;
        color: #353535;
      }
    </style>

    <div class="layout horizontal center container">
      <div class="flex">
        <div>[[ticket.type.text]]</div>
        <div class="secondary">[[_formatOptions(ticket.enabledOptions)]]</div>
      </div>
      <div class="price">€ [[_formatPrice(ticket.price)]]</div>
      <iron-icon icon="icons:delete" on-tap="removeTicket"></iron-icon>
    </div>
`,

  is: 'lancie-ticket-basket-item',

  properties: {
    ticket: {
      type: Object,
      notify: true,
    },
    orderId: Number,
  },

  removeTicket: function() {
    this.fire('remove-ticket', this.ticket.id);
  },

  _formatOptions: function(options) {
    if (options.length <= 0) {
      return 'No options selected';
    }
    var optionString =  options.reduce(function(a, b) {
      return a + b.name + ', ';
    }, '');
    return optionString.substring(0, optionString.length - 2);
  },

  _formatPrice: function(price) {
    return price.toFixed(2);
  }
});
