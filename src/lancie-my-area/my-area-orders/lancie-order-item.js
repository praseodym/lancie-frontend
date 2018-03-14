import '../../../../../@polymer/polymer/polymer.js';
import '../../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../../@polymer/paper-item/paper-item.js';
import { Polymer } from '../../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';

Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment">
    :host {
      display: block;
    }

    .block {
      padding: 4px 16px 4px 0;
    }

    .block > *:first-child {
      color: #737373;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
    </style>

    <paper-item class="layout horizontal center justified wrap" role="option" tabindex="0" aria-disabled="true">
      <div class="layout vertical block">
        <div>Ticket type:</div>
        <div>[[ticket.type.text]]</div>
      </div>
      <div class="layout vertical block options">
        <div>Extra options:</div>
        <div>[[_getOptions(ticket.enabledOptions)]]</div>
      </div>
      <div class="layout vertical block">
        <div>Price:</div>
        <div>€ [[_formatPrice(ticket.price)]]</div>
      </div>
      <div class="layout vertical block status">
        <div>Status:</div>
        <div>[[_getStatus(ticket)]]</div>
      </div>
      <slot></slot>
    </paper-item>
`,

  is: 'lancie-order-item',

  properties: {
    ticket: {
      type: Object,
      notify: true,
    },
    status: {
      type: String,
      value: '',
      notify: true
    },
  },

  _getOptions: function(options) {
    if (options.length <= 0) {
      return 'No options selected';
    }
    var optionString =  options.reduce(function(a, b) {
      return a + b.name + ', ';
    }, '');
    return optionString.substring(0, optionString.length - 2);
  },

  _getStatus: function(ticket) {
    return (this.ticket.token === undefined) ? this.status : 'Transfering';
  },

  _formatPrice: function(amount) {
    return amount.toFixed(2);
  }
});
