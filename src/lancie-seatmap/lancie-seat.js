import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../@polymer/paper-tooltip/paper-tooltip.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { PaperButtonBehavior } from '../../../../@polymer/paper-behaviors/paper-button-behavior.js';
/**
@license
Copyright (c) 2015 The LANcie commission of W.I.S.V `Christiaan Huygens`. All rights reserved.
This code may only be used under the BSD style license found at https://github.com/WISVCH/LANcie/blob/master/LICENSE
*/
'use strict';

Polymer({
  _template: `
    <style>
    :host {
      display: block;
      position: relative;
      width: 50%;
      height: 72px;
      margin-bottom: 5px;
    }

    [hidden] {
      display: none !important;
    }

    .seat {
      height: 100%;
      margin: 4px;
      border-radius: 2px;
      background: #fafafa;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }


    :host([seat-color="green"]) .seat {
      background-color: var(--paper-green-500);
    }

    :host([seat-color="yellow"]) .seat {
      background-color: var(--paper-yellow-500);
    }

    :host([seat-color="red"]) .seat {
      background-color: var(--paper-red-500);
      cursor: default !important;
    }

    :host([seat-color="gray"]) .seat {
      background-color: var(--paper-grey-500);
      cursor: default !important;
    }

    :host([seat-color="blue"]) .seat {
      background-color: var(--paper-blue-500);
    }
    </style>
    <div id="seat" class="seat" on-tap="showSeatDialog">
      <div>[[seat.seatNumber]]</div>
      <paper-tooltip for="seat" animationdelay="0">[[_getTooltipText(seat)]]</paper-tooltip>
    </div>
`,

  is: 'lancie-seat',

  behaviors: [
    PaperButtonBehavior
  ],

  properties: {
    user: {
      type: Object,
      value: function() {
        return {};
      }
    },
    seat: Object,
    tickets: {
      type: Array,
      value: function() {
        return [];
      }
    },
    filter: {
      type: String,
      value: ''
    },
    fixed: {
      type: Boolean,
      value: false
    },
    seatColor: {
      type: String,
      reflectToAttribute: true,
      computed: '_calculateSeatColor(user, tickets, seat, filter)'
    }
  },

  showSeatDialog: function() {
    if (this.seat.locked || this.seat.ticket) {
      return;
    }
    this.fire('request-seat-reserve', {'seatToReserve': this.seat});
  },

  _calculateSeatColor: function(user, tickets, seat, filter) {
    if (seat.locked) {
      return 'gray'; // Reserved
    }
    if (!seat.ticket) {
      return '';
    }
    if (seat.ticket.owner.profile.displayName && filter &&
      seat.ticket.owner.profile.displayName.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
      return 'blue'; // Filter (search bar)
    }
    if (user.reference === seat.ticket.owner.reference) {
      return 'green'; // Your own seat!
    }
    if (tickets &&
      tickets.map((ticket) => ticket.owner.reference)
        .includes(seat.ticket.owner.reference)) {
      return 'yellow'; // A team member's seat
    }
    if (seat.ticket.owner.reference !== user.reference) {
      return 'red'; // Taken
    }
    return ''; // Free
  },

  _getTooltipText: function(seat) {
    if (seat.locked) {
      return 'Reserved';
    }
    if (seat.ticket) {
      return seat.ticket.owner.profile.displayName;
    }
    if (!seat.locked && !seat.ticket) {
      return 'Free';
    }
    return 'Taken'; // Backup, if for some reason an invalid state is encountered (it is probably red then)
  }
});
