import '../../../../../@polymer/polymer/polymer.js';
import '../../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../../@polymer/iron-icons/iron-icons.js';
import '../../../../../@polymer/iron-icons/social-icons.js';
import '../../../../../@polymer/paper-button/paper-button.js';
import '../../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../../@polymer/paper-item/paper-item.js';
import '../../../../../@polymer/paper-item/paper-item-body.js';
import '../../../../../@polymer/paper-input/paper-input.js';
import '../../../../../@polymer/paper-toast/paper-toast.js';
import '../../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../../lancie-ajax/lancie-ajax.js';
import '../../../../../lancie-error/lancie-error.js';
import '../../../../../lancie-dialog/lancie-dialog.js';
import './team-member-item.js';
import './my-area-teams-invite.js';
import { Polymer } from '../../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

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

      .team-info {
        background: #eee;
        padding: 3px 10px;
      }

      .team-header {
        font-size: 18px;
        font-weight: 400;
      }

      .team-captain {
        color: #757575;
        font-size: 14px;
      }
    </style>

    <lancie-ajax id="ajaxInviteMember" refurl="teams/[[team.id]]/invites" method="POST" handle-as="json" on-lancie-ajax="onInviteMember"></lancie-ajax>
    <lancie-ajax id="ajaxGetTeamInvites" refurl="teams/[[team.id]]/invites" method="GET" handle-as="json" on-lancie-ajax="storeTeamInvites"></lancie-ajax>

    <paper-item class="team-info">
      <paper-item-body class="layout horizontal center">
        <div class="team-header flex">
          <div class="team-name">[[team.teamName]]</div>
          <span class="team-captain"><b>Captain: </b>[[team.captain.profile.displayName]]</span>
        </div>
        <template is="dom-if" if="[[_isSameUser(team.captain, user)]]">
          <div class="team-header">
            <paper-icon-button id="addMemberButton" icon="social:person-add" on-tap="openAddMemberDialog"></paper-icon-button>
            <paper-tooltip offset="0" for="addMemberButton" animation-delay="1">Invite a member</paper-tooltip>
            <paper-icon-button id="openInvitesButton" icon="icons:markunread-mailbox" on-tap="openTeamInvitesDialog"></paper-icon-button>
            <paper-tooltip offset="0" for="openInvitesButton" animation-delay="1">View open invites</paper-tooltip>
          </div>
        </template>
      </paper-item-body>
    </paper-item>
    <template is="dom-repeat" items="[[team.members]]" as="member">
      <team-member-item can-remove-member="[[_canRemove(member, team)]]" member="[[member]]" team="[[team]]"></team-member-item>
    </template>

    <!-- Invite a Member dialog -->
    <lancie-dialog id="addMemberDialog">
      <h2>Add a team member</h2>
      <div class="dialog-content">
        <lancie-error id="error"></lancie-error>
        <paper-input label="Email" type="text" value="{{memberEmail}}"></paper-input>
      </div>
      <div class="dialog-actions">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button on-tap="submitInviteMember">Invite</paper-button>
      </div>
    </lancie-dialog>

    <!-- Team Invite Overview Dialog -->
    <lancie-dialog id="teamInvitesDialog">
      <h2>Pending invites for [[team.teamName]]</h2>
      <div class="dialog-content">
        <template is="dom-if" if="[[teamInvites.length]]">
          <template is="dom-repeat" items="[[teamInvites]]">
            <my-area-teams-invite invite="[[item]]" team="" on-invite-change="refreshInvites"></my-area-teams-invite>
          </template>
        </template>
        <template is="dom-if" if="[[!teamInvites.length]]">
          <p>There are no pending invites for this team!</p>
        </template>
      </div>
      <div class="dialog-actions">
        <paper-button dialog-dismiss="">Close</paper-button>
      </div>
    </lancie-dialog>
`,

  is: 'team-item',

  properties: {
    team: Object,
    user: Object,
    teamInvites: Array,
    memberEmail: String,
  },

  refreshInvites: function() {
    this.$.ajaxGetTeamInvites.generateRequest();
  },

  openAddMemberDialog: function() {
    this.addMemberMessage = '';
    this.memberEmail = '';
    this.$.addMemberDialog.open();
  },

  submitInviteMember: function() {
    this.$.error.clear();
    this.$.ajaxInviteMember.body = this.memberEmail;
    this.$.ajaxInviteMember.generateRequest();
  },

  onInviteMember: function(e, r) {
    if (r.succeeded) {
      this.fire('invite-success');
      this.$.addMemberDialog.close();
      this.$.memberInviteSuccessToast.show();
    } else {
      if (r.request.status === 403) {
        this.$.error.setError('User can\'t be added to this team, does he/she have a ticket?');
      } else if (r.request.status === 409) {
        this.$.error.setError('User is already invited for this team!');
      } else {
        this.$.error.setError('Something went wrong');
      }
    }
  },

  storeTeamInvites: function(event, request) {
    this.teamInvites = request.response ? request.response : false;
  },

  openTeamInvitesDialog: function() {
    this.$.ajaxGetTeamInvites.generateRequest();
    this.$.teamInvitesDialog.open();
  },

  _canRemove: function(member, team) {
    if (this.user.email === team.captain.email) {
      if (member.email !== team.captain.email) {
        return true;
      } else if (team.members.length === 1) {
        return true;
      }
    } else if (this.user.email === member.email) {
      return true;
    }
    return false;
  },

  _isSameUser: function(user1, user2) {
    return user1.reference === user2.reference;
  }
});
