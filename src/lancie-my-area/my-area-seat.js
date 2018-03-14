import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/paper-card/paper-card.js';
import '../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../@polymer/paper-item/paper-item.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment">
    :host {
      display: block;
    }

    paper-card {
      width: 100%;
    }

    paper-tooltip {
      --paper-tooltip-background: var(--primary-color);
      --paper-tooltip-text-color: var(--secondary-color);
    }
    </style>

    <lancie-ajax id="ajaxGetAllSeats" refurl="seats" on-lancie-ajax="onGetAllSeats"></lancie-ajax>
    <lancie-ajax auto-fire="" id="ajaxGetTeamTickets" refurl="tickets/teammembers" on-lancie-ajax="onGetTeamTickets"></lancie-ajax>

    <paper-card heading="Seat" elevation="1" animated-shadow="true">
        <div class="card-content">
          <template is="dom-if" if="[[seats.length]]">
            <template is="dom-repeat" items="[[seats]]" index-as="index">
              <paper-item class="layout horizontal">
                <div class="flex">[[item.ticket.owner.profile.displayName]]</div>
                <div>[[item.seatGroup]][[item.seatNumber]]</div>
              </paper-item>
            </template>
          </template>
          <template is="dom-if" if="[[!seats.length]]">
            Reserve your seat now!
          </template>
        </div>
        <div class="card-actions">
          <paper-icon-button on-tap="reserveSeat" icon="icons:event-seat" id="reserve-seat"></paper-icon-button>
          <paper-tooltip for="reserve-seat" offset="0" animation-delay="1">Reserve a seat</paper-tooltip>
          <paper-icon-button icon="icons:refresh" on-tap="refreshSeats" id="refresh-seat"></paper-icon-button>
          <paper-tooltip for="refresh-seat" offset="0" animation-delay="1">Refresh</paper-tooltip>
        </div>
      </paper-card>
`,

  is: 'my-area-seat',

  properties: {
    teamMembers: {
      type: Array,
      value: function() {
        return [];
      }
    },
    seats: {
      type: Array,
      value: function() {
        return [];
      }
    }
  },

  onGetAllSeats: function(e, request) {
    if (request.succeeded) {
      this.seats = [];
      var seatmap = request.response.seatmap;
      for (var group in seatmap) {
        this.seats = this.seats.concat(seatmap[group].filter(function(seat) {
          if (!seat.ticket || !seat.ticket.owner.profile.displayName) {
            return false;
          }
          return this.teamMembers.includes(seat.ticket.owner.profile.displayName);
        }.bind(this)));
      }
   } else {
      this.fire('refresh-toast');
    }
  },

  onGetTeamTickets: function(e, request) {
    if (request.succeeded) {
      this.teamMembers = request.response.map(function(ticket) {
        return ticket.owner.profile.displayName;
      });
      this.$.ajaxGetAllSeats.generateRequest();
    } else {
      this.fire('refresh-toast');
    }
  },

  reserveSeat: function() {
    this.fire('navigate', {page: 'seatmap'});
  },

  refreshSeats: function() {
    this.$.ajaxGetTeamTickets.generateRequest();
  }
});
