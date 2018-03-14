import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../@polymer/iron-icons/iron-icons.js';
import '../../../../@polymer/iron-icons/social-icons.js';
import '../../../../@polymer/paper-card/paper-card.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../@polymer/paper-item/paper-item.js';
import '../../../../@polymer/paper-item/paper-item-body.js';
import '../../../../@polymer/paper-input/paper-input.js';
import '../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../@polymer/paper-badge/paper-badge.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import '../../../../lancie-error/lancie-error.js';
import '../../../../lancie-dialog/lancie-dialog.js';
import './my-area-teams/my-area-teams-invite.js';
import './my-area-teams/team-member-item.js';
import './my-area-teams/team-item.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <lancie-ajax auto-fire="" id="ajaxTeams" refurl="users/current/teams" handle-as="json" last-response="{{teams}}"></lancie-ajax>
    <lancie-ajax auto-fire="" id="ajaxGetPersonalInvites" refurl="users/current/teams/invites" handle-as="json" last-response="{{personalInvites}}"></lancie-ajax>
    <lancie-ajax id="ajaxCreateTeam" refurl="teams" method="POST" handle-as="json" on-lancie-ajax="onCreateTeam"></lancie-ajax>
    <lancie-ajax id="ajaxAcceptInvite" refurl="teams/invites" method="POST" handle-as="json" on-lancie-ajax="onAcceptInvite"></lancie-ajax>
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
    :host {
      display: block;
    }

    [hidden] {
      display: none !important;
    }

    paper-tooltip {
      --paper-tooltip-background: var(--primary-color);
      --paper-tooltip-text-color: var(--secondary-color);
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #e8e8e8;
      margin: 1em 0;
      padding: 0;
    }

    paper-badge {
      --paper-badge-margin-left: -20px;
      --paper-badge-margin-bottom: -18px;
      --paper-badge-background: var(--primary-color);
      --paper-badge-text-color: var(--secondary-color);
    }
    </style>
    <paper-card class="layout vertical flex" heading="Teams" elevation="1" animated-shadow="true">
      <div class="card-content">
        <template is="dom-if" if="[[!teams.length]]">
          You're not in a team yet!
        </template>
        <template is="dom-if" if="[[teams.length]]">
          <template is="dom-repeat" items="[[teams]]">
            <team-item team="[[item]]" user="[[user]]" on-remove-member="refreshTeams"></team-item>
          </template>
        </template>
      </div>
      <div class="card-actions">
        <paper-icon-button id="new-team" icon="social:group-add" on-tap="openCreateTeamDialog"></paper-icon-button>
        <paper-tooltip for="new-team" offset="0" animation-delay="1">Create a new team</paper-tooltip>
        <paper-icon-button id="teamInviteButton" icon="icons:inbox" on-tap="openPersonalInvitesDialog"></paper-icon-button>
        <paper-tooltip for="teamInviteButton" offset="0" animation-delay="1">View your open invites</paper-tooltip>
        <template is="dom-if" if="[[personalInvites.length]]">
          <paper-badge for="teamInviteButton" label="[[personalInvites.length]]"></paper-badge>
        </template>
      </div>
    </paper-card>

    <!-- Dialogs -->
    <!-- Create Team Dialog -->
    <lancie-dialog id="createTeamDialog">
      <h2>Create a Team</h2>
      <div class="dialog-content">
        <lancie-error id="error"></lancie-error>
        <paper-input label="Team name" type="text" value="{{teamName}}"></paper-input>
      </div>
      <div class="dialog-actions">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button on-tap="submitCreateTeam">Create</paper-button>
      </div>
    </lancie-dialog>

    <!-- Personal Invites Overview Dialog -->
    <lancie-dialog id="personalInvitesDialog">
      <h2>Your personal invites</h2>
      <div class="dialog-content">
        <template is="dom-if" if="[[personalInvites.length]]">
          <template is="dom-repeat" items="[[personalInvites]]">
            <my-area-teams-invite invite="[[item]]" personal="" on-invite-change="refreshInvites"></my-area-teams-invite>
          </template>
        </template>
        <template is="dom-if" if="[[!personalInvites.length]]">
          <p>You don't have any open invites!</p>
        </template>
      </div>
      <div class="dialog-actions">
        <paper-button dialog-dismiss="">Close</paper-button>
      </div>
    </lancie-dialog>
`,

  is: 'my-area-teams',

  properties: {
    teams: Array,
    user: Object,
    personalInvites: Array,
    teamName: String,
    createTeamMessage: String
  },

  refreshTeams: function() {
    this.$.ajaxTeams.generateRequest();
  },

  refreshInvites: function() {
    this.$.ajaxGetPersonalInvites.generateRequest();
    this.refreshTeams();
  },

  openCreateTeamDialog: function() {
    this.teamName = '';
    this.$.createTeamDialog.open();
  },

  openPersonalInvitesDialog: function() {
    this.$.personalInvitesDialog.open();
  },

  submitCreateTeam: function() {
    this.$.error.clear();
    this.$.ajaxCreateTeam.body = {
      teamName: this.teamName,
      captainEmail: this.user.email
    };
    this.$.ajaxCreateTeam.generateRequest();
  },

  onCreateTeam: function(e, r) {
    if (r.succeeded) {
      this.$.ajaxTeams.generateRequest();
      this.$.createTeamDialog.close();
    } else {
      if (r.request.status === 409) {
        this.$.error.setError('Teamname already in use.');
      } else if (r.request.status === 403) {
        this.$.error.setError('You\'re not allowed to create a team. Do you have a ticket?');
      } else {
        this.$.error.setError('Something went wrong');
      }
    }
  }
});
