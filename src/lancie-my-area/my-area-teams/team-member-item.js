import '../../../../../@polymer/polymer/polymer.js';
import '../../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../../@polymer/iron-icons/iron-icons.js';
import '../../../../../@polymer/iron-icons/social-icons.js';
import '../../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../../@polymer/paper-item/paper-item.js';
import '../../../../../@polymer/paper-item/paper-item-body.js';
import '../../../../../@polymer/paper-button/paper-button.js';
import '../../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../../lancie-ajax/lancie-ajax.js';
import '../../../../../lancie-dialog/lancie-dialog.js';
import { Polymer } from '../../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
      :host {
        display: block;
      }

      .member-info {
        margin-left: 16px;
      }
    </style>
    <lancie-ajax id="ajaxRemoveMember" refurl="teams/[[team.id]]/members" method="DELETE" handle-as="json" body="[[member.email]]" on-lancie-ajax="onRemoveMember"></lancie-ajax>

    <paper-item>
      <paper-item-body class="layout horizontal center member-icon">
        <iron-icon icon="social:person" item-icon=""></iron-icon>
        <div class="flex member-info">[[member.profile.displayName]]</div>
        <paper-icon-button id="removeMemberButton" icon="icons:clear" on-tap="openRemoveMemberDialog" disabled="[[!canRemoveMember]]"></paper-icon-button>
        <paper-tooltip for="removeMemberButton" offset="0" animation-delay="1">Remove from team</paper-tooltip>
      </paper-item-body>
    </paper-item>

    <!-- Invite a Member dialog -->
    <lancie-dialog id="removeMemberDialog">
      <h2>Remove a team member</h2>
      <div class="dialog-content">You are about to remove [[member.profile.displayName]] from this team. Are you sure?</div>
      <div class="dialog-actions">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button on-tap="submitDeleteUser">Remove</paper-button>
      </div>
    </lancie-dialog>
`,

  is: 'team-member-item',

  properties: {
    member: Object,
    team: Object,
    canRemoveMember: Boolean,
    removeMemberMessage: String
  },

  openRemoveMemberDialog: function() {
    this.$.removeMemberDialog.open();
  },

  submitDeleteUser: function() {
    this.$.ajaxRemoveMember.generateRequest();
  },

  onRemoveMember: function(event, request) {
    if (request.succeeded) {
      this.$.removeMemberDialog.close();
      this.fire('toast', {text: 'User successfully removed!'});
      this.fire('remove-member');
    }
  }
});
