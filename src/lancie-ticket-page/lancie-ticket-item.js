import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/paper-styles/color.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../@polymer/paper-checkbox/paper-checkbox.js';
import '../../../../@polymer/paper-material/paper-material.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';

Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: flex;
        flex-direction: column;
        margin: 8px;
        color: white;
      }

      paper-material {
        padding: 8px;
        flex: 1;
      }

      .name {
        font-size: 32px;
        font-weight: 600;
        margin: 8px 0;
      }

      .price {
        font-size: 24px;
        font-weight: 100;
      }

      hr {
        border: solid 1px white;
        width: 100%;
      }

      paper-checkbox {
        margin: 2px;
        --paper-checkbox-label-color: white;
        --paper-checkbox-checked-color: white;
        --paper-checkbox-unchecked-color: white;
        --paper-checkbox-checkmark-color: black;
        --paper-checkbox-checked-ink-color: white;
      }

      iron-icon {
        height: 32px;
        width: 32px;
      }

      paper-button {
        background: rgba(255, 255, 255, 0.3);
        color: white;
        width: 100%;
        font-weight: 600;
      }

      paper-button[disabled] {
        background: rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.4);
      }

      .red {
        background-color: var(--paper-deep-orange-400);
      }
      .blue {
        background-color: var(--paper-indigo-400);
      }
      .green {
        background-color: var(--paper-green-400);
      }
      .purple {
        background-color: var(--paper-purple-400);
      }
      .orange {
        background-color: var(--paper-orange-400);
      }
      .sold-out {
        background: rgba(0, 0, 0, 0.3);
      }
    </style>

    <lancie-ajax id="addTicket" method="POST" on-lancie-ajax="onAddTicket"></lancie-ajax>

    <paper-material class\$="[[_getClasses(color, available)]]">
      <span class="name">[[ticket.text]]</span>
      <span class="price">€ [[totalString]]</span>
      <span class="deadline">[[_deadline(ticket, available)]]</span>
      <hr hidden\$="[[!options.length]]">
      <template is="dom-repeat" items="{{options}}">
        <paper-checkbox checked="{{item.picked}}">[[item.text]]</paper-checkbox>
      </template>
      <hr>
      <div class="layout horizontal end-justified">
        <paper-button disabled="[[!available]]" on-tap="addToBasket">ADD</paper-button>
      </div>
    </paper-material>
`,

  is: 'lancie-ticket-item',

  properties: {
    ticket: Object,
    available: Boolean,
    options: {
      type: Array,
      value: function() {
        return [];
      },
    },
    basket: {
      type: Object,
      notify: true,
    },
    totalString: String,
    // This determines how a ticket is displayed in the front-end
    deadlineDisplay: {
      type: Object,
      value: {
        'EARLY': 'deadline',
        'NORMAL': 'deadline',
        'LATE': 'deadline',
      },
    },
    color: String,
  },

  observers: [
    '_calculatePrice(options.*, ticket)',
    '_ticketProperties(ticket)'
  ],

  addToBasket: function() {
    if (!this.basket.tickets) {
      this.$.addTicket.refurl = 'orders';
    } else if (this.basket.tickets.length >= 5) {
      this.fire('toast', {text: 'Maximum of 5 tickets in order.'});
      return;
    } else {
      this.$.addTicket.refurl = 'orders/' + this.basket.id;
    }

    var pickedOptions = this.options
      .filter(function(option) {
        return option.picked;
      }).map(function(option) {
        return option.text;
      });

    this.$.addTicket.body = {
      type: this.ticket.ticketType,
      options: pickedOptions,
    };
    this.$.addTicket.generateRequest();
  },

  onAddTicket: function(e, request) {
    if (request.succeeded) {
      this.fire('set-basket', {basket: request.response.object});
    } else {
      this.fire('refresh-toast');
    }
  },

  _getClasses: function(color, available) {
    var classes = 'layout vertical justified ' + color;
    classes += (available) ? '' : ' sold-out';
    return classes;
  },

  _ticketProperties: function(ticket) {
    this.options = this._options(ticket);
    this.available = this._available(ticket);
  },

  _options: function(ticket) {
    var options = [];
    for (var option in ticket.possibleOptions) {
      options.push({
        text: option,
        price: ticket.possibleOptions[option],
        picked: false,
      });
    }
    return options;
  },

  _available: function(ticket) {
    if (Date.now() > new Date(this.ticket.deadline)) {
      return false;
    }
    if (this.ticket.limit === 0) {
      return true;
    }
    return this.ticket.numberSold < this.ticket.limit;
  },

  _deadline: function(ticket, available) {
    if (!available) {
      return 'Sold out!';
    }
    var deadlineType = this.deadlineDisplay[ticket.ticketType];
    if (deadlineType === 'deadline') {
      // The + "Z" is needed to make sure all browsers interpret the time as UTC
      // ISO 8601 specifies that date/time literals without time zone information
      // should be interpreted as local time, while ES5.1 specifies it should
      // be interpreted as UTC.
      return 'Available until: ' + new Date(this.ticket.deadline + 'Z')
        .toLocaleString('nl', {hour12: false, timeZone: 'UTC'});
    } else if (deadlineType === 'limit') {
      return 'Only ' + (ticket.limit - ticket.numberSold) + ' left!';
    } else {
      return 'Available';
    }
  },

  _calculatePrice: function(changed, ticket) {
    this.totalString = changed.base
      .filter(function(option) {
        return option.picked;
      }).reduce(function(a, b){
        return a + b.price;
      }, ticket.price).toFixed(2);
  }
});
