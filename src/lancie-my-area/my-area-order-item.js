import '../../../../@polymer/paper-item/paper-item.js';
import '../../../../@polymer/paper-item/paper-item-body.js';
import '../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/neon-animation/neon-animations.js';
import '../../../../lancie-dialog/lancie-dialog.js';
import './my-area-orders/lancie-order-item.js';
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
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #e8e8e8;
      padding: 0;
    }

    .order-stats > div > b {
      display: inline-block;
      width: 120px;
    }

    .block {
      padding: 4px 16px 4px 0;
    }

    .block > *:first-child {
      color: #737373;
      font-family: 'Roboto', 'Noto', sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
    </style>

    <paper-item id="[[order.id]]" class="layout horizontal center justified wrap">
      <div class="layout vertical block">
        <div>Order:</div>
        <div>Order #[[order.id]]</div>
      </div>
      <div class="layout vertical block">
        <div>Amount:</div>
        <div>€ [[_format(order.amount)]]</div>
      </div>
      <div class="layout vertical block">
        <div>Status:</div>
        <div>[[_getStatus(order.status)]]</div>
      </div>
      <div class="layout vertical block">
        <div>Ordered on:</div>
        <div>[[order.creationDateTime]]</div>
      </div>
      <paper-icon-button icon="icons:info" on-tap="showOrderTickets"></paper-icon-button>
    </paper-item>
    <hr>

    <lancie-dialog id="orderInfo">
      <h2>Order #[[order.id]]</h2>
      <div class="dialog-content">
        <div class="order-stats">
          <div><b>Ordered on: </b>[[order.creationDateTime]]</div>
          <div><b>Price: </b>€ [[_format(order.amount)]]</div>
          <div><b>Status: </b>[[_getStatus(order.status)]]</div>
        </div>
        <template is="dom-repeat" items="[[order.tickets]]">
          <hr>
          <lancie-order-item ticket="[[item]]" status="[[_getStatus(order.status)]]"></lancie-order-item>
        </template>
      </div>
      <div class="dialog-actions">
        <paper-button dialog-dismiss="">Close</paper-button>
      </div>
    </lancie-dialog>
`,

  is: 'my-area-order-item',

  properties: {
    order: {
      type: Object,
      notify: true
    }
  },

  getIcon: function(binding) {
    return binding ? 'icons:check' : 'icons:clear';
  },

  showOrderTickets: function() {
    this.$.orderInfo.open();
  },

  _format: function(amount) {
    return amount.toFixed(2);
  },

  // Format strings to improve representation to user
  _getStatus: function(status) {
    if (status === 'ANONYMOUS' || status === 'ASSIGNED') {
      return 'CREATING';
    } else if (status === 'PENDING') {
      return 'PAYMENT PENDING';
    }
    return status;
  }
});
