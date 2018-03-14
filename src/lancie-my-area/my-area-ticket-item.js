import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../@polymer/paper-input/paper-input.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/neon-animation/neon-animations.js';
import '../../../../lancie-dialog/lancie-dialog.js';
import '../../../../lancie-error/lancie-error.js';
import '../../../../lancie-ajax/lancie-ajax.js';
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

    [hidden] {
      display: none !important;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #e8e8e8;
      padding: 0;
    }
    </style>

    <lancie-ajax id="ajaxSetupTicketTransfer" refurl="tickets/transfer/[[ticket.id]]" method="POST" body="[[email]]" on-lancie-ajax="onSetupTicketTransfer"></lancie-ajax>
    <lancie-ajax id="ajaxCancelTicketTransfer" refurl="tickets/transfer" method="DELETE" body="[[ticket.token]]" on-lancie-ajax="onCancelTicketTransfer"></lancie-ajax>

    <hr>
    <lancie-order-item id="ticketItem" ticket="{{ticket}}" class="flex">
      <div class="layout self-center vertical">
        <paper-icon-button icon="[[_getIcon(ticket.token)]]" on-tap="openTicketTransferDialog"></paper-icon-button>
        <paper-tooltip offset="0" animation-delay="1">[[_getText(ticket.token)]] ticket transfer</paper-tooltip>
      </div>
    </lancie-order-item>

    <lancie-dialog id="ticketTransferDialog">
      <h2>Set up ticket transfer</h2>
      <div class="dialog-content">
        <lancie-error id="error"></lancie-error>
        <paper-input type="email" id="email" label="Email" name="Email" value="{{email}}" error-message="Email should be valid." required="" autofocus=""></paper-input>
      </div>
      <div class="dialog-actions">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button on-tap="setupTicketTransfer">Set up</paper-button>
      </div>
    </lancie-dialog>
`,

  is: 'my-area-ticket-item',

  properties: {
    user: Object,
    ticket: {
      type: Object,
      value: {},
      notify: true
    },
    email: String,
  },

  openTicketTransferDialog: function() {
    if (!!this.ticket.token) {
      this.$.ajaxCancelTicketTransfer.generateRequest();
    } else {
      this.$.ticketTransferDialog.open();
    }
  },

  setupTicketTransfer: function() {
    this.$.error.clear();
    if (!this.$.email.validate()) {
      return;
    }
    if (this.email === this.user.email) {
      this.$.error.setError('You can\'t a transfer ticket to yourself.');
      return;
    }
    this.$.ajaxSetupTicketTransfer.generateRequest();
  },

  onSetupTicketTransfer: function(e, request) {
    if (request.succeeded) {
      this.$.ticketTransferDialog.close();
      this.email = '';
      this.async(function() {this.set('ticket.token', request.response.object);}, 500);
      this.fire('toast', {text: 'Ticket set up for transfer.'});
    } else {
      if (request.request.response.exception.indexOf('UsernameNotFound') > -1) {
        this.$.error.setError('User not found.');
      } else {
        this.$.error.setError('The server was unable to process your request.');
      }
    }
  },

  onCancelTicketTransfer: function(e, request) {
    if (request.succeeded) {
      this.set('ticket.token', undefined);
      this.fire('toast', {text: 'Ticket transfer cancelled.'});
    } else {
      this.fire('toast', {text: 'Unable to cancel ticket transfer. Try refreshing the page.'});
    }
  },

  _getIcon: function(token) {
    return token === undefined ? 'icons:send' : 'icons:clear';
  },

  _getText: function(token) {
    return token === undefined ? 'Setup up' : 'Cancel';
  }
});
