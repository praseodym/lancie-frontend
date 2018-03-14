import './my-area-order-item.js';
import './my-area-ticket-item.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import './lancie-terms-of-service.js';
import '../../../../@polymer/paper-card/paper-card.js';
import '../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../@polymer/neon-animation/neon-animations.js';
import '../../../../@polymer/paper-toast/paper-toast.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';
Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
    :host {
      display: block;
    }

    hr {
      border: 0;
      border-top: 1px solid #e8e8e8;
    }

    paper-tooltip {
      --paper-tooltip-background: var(--primary-color);
      --paper-tooltip-text-color: var(--secondary-color);
    }

    .title-text {
      font-size: 24px;
      font-weight: 400;
      color: #000;
      padding: 16px;
    }
    </style>

    <lancie-ajax auto-fire="" id="ajaxOrders" refurl="users/current/orders" handle-as="json" on-lancie-ajax="storeOrders"></lancie-ajax>
    <lancie-ajax auto-fire="" id="ajaxTickets" refurl="users/current/tickets" handle-as="json" on-lancie-ajax="storeTickets"></lancie-ajax>
    <lancie-ajax id="ajaxTokens" refurl="tickets/tokens" method="GET" handle-as="json" on-lancie-ajax="storeTokens"></lancie-ajax>

    <paper-card class="layout vertical flex">
      <div class="title-text">Orders</div>
      <div class="card-content">
        <hr>
        <template is="dom-if" if="[[orders.length]]">
          <template is="dom-repeat" items="[[orders]]">
            <my-area-order-item order="[[item]]"></my-area-order-item>
          </template>
        </template>
        <template is="dom-if" if="[[!orders.length]]">
          You don't have any orders yet
        </template>
      </div>

      <div class="title-text">Tickets</div>
      <div class="card-content">
        <template is="dom-if" if="[[tickets.length]]">
          <template is="dom-repeat" items="[[tickets]]" index-as="index">
            <my-area-ticket-item user="[[user]]" ticket="[[item]]"></my-area-ticket-item>
          </template>
        </template>
        <template is="dom-if" if="[[!tickets.length]]">
          You don't have any tickets yet
        </template>
      </div>
      <div class="card-actions">
        <paper-icon-button on-tap="buyTickets" icon="icons:add-shopping-cart" id="buy-ticket">Buy tickets</paper-icon-button>
        <paper-tooltip for="buy-ticket" offset="0" animation-delay="1">Buy tickets</paper-tooltip>
        <paper-icon-button on-tap="showTermsAndConditions" icon="icons:description" id="terms-and-conditions">Terms and Conditions</paper-icon-button>
        <paper-tooltip for="terms-and-conditions" offset="0" animation-delay="1">Terms and conditions</paper-tooltip>
      </div>
    </paper-card>

    <lancie-terms-of-service id="termsOfService">
      <paper-button on-tap="closeDialog">Close</paper-button>
    </lancie-terms-of-service>

    <paper-toast id="ticketTransferTokensRetrievalError" text="Unable to check for open ticket transfers!" duration="3000"></paper-toast>
`,

  is: 'my-area-orders',

  properties: {
    user: Object,
    orders: {
      type: Array,
      value: function() {
        return [];
      }
    },
    tempTickets: {
      type: Array,
      value: function() {
        return [];
      }
    },
    tickets: {
      type: Array,
      value: function() {
        return [];
      }
    },
  },

  buyTickets: function() {
    this.fire('navigate', {page: 'tickets'});
  },

  showTermsAndConditions: function() {
    this.$.termsOfService.open();
  },

  storeOrders: function(event, request) {
    this.orders = request.response.length > 0 ? request.response : false;
  },

  storeTickets: function(event, request) {
    this.tempTickets = request.response.length > 0 ? request.response : false;
    this.$.ajaxTokens.generateRequest();
  },

  storeTokens: function(event, request) {
    if (request.succeeded) {
      request.response.object.forEach((function(_this) {
        return function(ttt) {
          return _this.tempTickets.forEach(function(ticket) {
            if (ticket.id === ttt.ticket.id) {
              ticket.token = ttt.token;
            }
          });
        };
      })(this));
      this.tickets = this.tempTickets;
    } else {
      this.$.ticketTransferTokensRetrievalError.show();
    }
  },

  getIcon: function(binding) {
    return binding ? 'icons:check' : 'icons:clear';
  },

  closeDialog: function() {
    this.$.termsOfService.close();
  }
});
