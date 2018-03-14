import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/paper-card/paper-card.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import './lancie-ticket-basket-item.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  is: 'lancie-ticket-basket',
  properties: {
    user: Object,
    basket: {
      type: Object,
      notify: true,
    },
  },

  removeTicket: function(e, ticketId) {
    this.$.removeTicket.refurl = 'orders/' + this.basket.id + '/' + ticketId;
    this.$.removeTicket.generateRequest();
  },

  onRemoveTicket: function(e, request) {
    if (request.succeeded) {
      this.fire('set-basket', {basket: request.response.object});
    } else {
      this.fire('toast', {text: 'Unable to remove ticket, order has probably expired. Try refreshing the page.'});
    }
  },

  _hasTickets: function(tickets) {
    if (!tickets || tickets.length === 0) {
      return false;
    }
    return true;
  },

  _formatPrice: function(price) {
    return price.toFixed(2);
  },

  _userAssigned: function(basket) {
    return !!basket.user;
  },

  _sortBasket: function(a, b) {
    if (a.type.name !== b.type.name) {
      return a.type.name.localeCompare(b.type.name);
    } else {
      return a.price - b.price;
    }
  },

	});
