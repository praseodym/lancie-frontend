import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <app-localstorage-document id="storage" key="order" data="{{orderId}}"></app-localstorage-document>

    <lancie-ajax id="openOrder" refurl="orders/[[orderId.id]]" on-lancie-ajax="onOrder"></lancie-ajax>
`,

  is: 'lancie-order-storage',

  properties: {
    orderId: {
      type: Object,
      observer: '_changed',
      value: function() {
        return {};
      }
    },
    initial: {
      type: Boolean,
      value: true
    },
  },

  storeOrderId: function(id) {
    this.initial = false;
    this.orderId = {
      id: id
    };
  },

  onOrder: function(e, request) {
    if (request.succeeded) {
      this.fire('order', request.response);
    } else {
      this.removeStorage();
    }
  },

  removeStorage: function() {
    this.orderId = {};
  },

  orderStored: function() {
    return !!this.orderId && !!this.orderId.id;
  },

  _changed: function(orderId) {
    if (!!orderId && !!orderId.id) {
      this.$.openOrder.generateRequest();
    }
  }
});
