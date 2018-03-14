import '../../../../../@polymer/polymer/polymer.js';
import '../../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../../@polymer/iron-icons/iron-icons.js';
import '../../../../../@polymer/iron-icons/social-icons.js';
import '../../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../../@polymer/paper-item/paper-item.js';
import '../../../../../@polymer/paper-item/paper-item-body.js';
import '../../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../../@polymer/paper-toast/paper-toast.js';
import '../../../../../lancie-ajax/lancie-ajax.js';
import { Polymer } from '../../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';
Polymer({
  _template: `
    <lancie-ajax id="ajaxAcceptInvite" refurl="teams/invites" method="POST" handle-as="json" body="{{invite.token}}" on-lancie-ajax="onAcceptInvite"></lancie-ajax>
    <lancie-ajax id="ajaxCancelInvite" refurl="teams/invites" method="DELETE" handle-as="json" body="{{invite.token}}" on-lancie-ajax="onCancelInvite"></lancie-ajax>
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
    :host {
      display: block;
    }

    .team {
      margin-right: 20px;
    }

    paper-card {
      width: 100%;
    }

    paper-tooltip {
      --paper-tooltip-background: #1A2B43;
      --paper-tooltip-text-color: #FEE474;
    }

    #acceptInviteButton {
      --iron-icon-fill-color: #4CAF50;
    }

    #cancelInviteButton {
      --iron-icon-fill-color: #F44336;
    }
    </style>
    <paper-item>
      <paper-item-body class="layout horizontal center layout start-justified">
        <template is="dom-if" if="{{personal}}">
          <div class="team-header flex">
            <div class="team-name">{{invite.teamName}}</div>
          </div>
        </template>
        <template is="dom-if" if="{{team}}">
          <div class="team-header flex">
            <div class="team-name">{{invite.email}}</div>
          </div>
        </template>
        <div>
          <template is="dom-if" if="{{personal}}">
            <paper-icon-button id="acceptInviteButton" icon="icons:check" on-tap="submitAcceptInvite"></paper-icon-button>
            <paper-tooltip offset="0" for="addMemberButton" animation-delay="1">Accept invite</paper-tooltip>
          </template>
          <paper-icon-button id="cancelInviteButton" icon="icons:clear" on-tap="submitCancelInvite"></paper-icon-button>
          <paper-tooltip offset="0" for="openInvitesButton" animation-delay="1">Cancel Invite</paper-tooltip>
        </div>
      </paper-item-body>
    </paper-item>
    <paper-toast id="acceptInviteSuccess" text="Welcome to Team {{invite.teamName}}!" duration="3000"></paper-toast>
`,

  is: 'my-area-teams-invite',

  properties: {
    invite: Object,
    team: Boolean,
    personal: Boolean
  },

  ready: function() {
    console.log(this.invite);
  },

  submitAcceptInvite: function() {
    this.$.ajaxAcceptInvite.generateRequest();
  },

  onAcceptInvite: function(e, r) {
    if (r.succeeded) {
      this.fire('invite-change');
      this.$.acceptInviteSuccess.show();
    } else {
      this.inviteMemberMessage = 'Something went wrong';
    }
  },

  submitCancelInvite: function() {
    this.$.ajaxCancelInvite.generateRequest();
  },

  onCancelInvite: function(e, r) {
    if (r.succeeded) {
      this.fire('invite-change');
    } else {
      this.inviteMemberMessage = 'Something went wrong';
    }
  }
});
