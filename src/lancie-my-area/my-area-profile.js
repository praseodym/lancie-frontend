import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/paper-card/paper-card.js';
import '../../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../@polymer/iron-icons/iron-icons.js';
import '../../../../@polymer/iron-icons/communication-icons.js';
import '../../../../@polymer/iron-icons/social-icons.js';
import '../../../../@polymer/paper-input/paper-input.js';
import '../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../@polymer/paper-tooltip/paper-tooltip.js';
import '../../../../@polymer/paper-toast/paper-toast.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import '../../../../lancie-login-form/lancie-passwords.js';
import './profile-edit-form.js';
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

    paper-tooltip {
      --paper-tooltip-background: var(--primary-color);
      --paper-tooltip-text-color: var(--secondary-color);
    }

    .item {
      margin: 8px 0;
      font-weight: 400;
    }

    iron-icon {
      padding: 8px;
      margin-right: 8px;
    }

    #checkIcon {
      --iron-icon-fill-color: #4CAF50;
    }

    #closeIcon {
      --iron-icon-fill-color: #F44336;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #e8e8e8;
      margin: 1em 0;
      padding: 0;
    }

    </style>

    <paper-card class="layout vertical flex" heading="Profile">
      <div class="card-content">

        <div hidden\$="[[editingProfile]]">
          <div class="layout horizontal center">
            <iron-icon icon="icons:account-circle" item-icon=""></iron-icon>
            <div class="item flex">
              <div>{{user.profile.displayName}}</div>
              <div>{{user.profile.firstName}} {{user.profile.lastName}}</div>
            </div>
          </div>
          <div class="layout horizontal center">
            <iron-icon icon="social:cake" item-icon=""></iron-icon>
            <div class="item flex">
              <div>{{user.profile.birthday}}</div>
            </div>
          </div>
          <div class="layout horizontal center">
            <iron-icon icon="communication:phone" item-icon=""></iron-icon>
            <div class="item flex">
              <div>{{_checkEmpty(user.profile.phoneNumber)}}</div>
            </div>
          </div>
          <div class="layout horizontal center">
            <iron-icon icon="communication:location-on" item-icon=""></iron-icon>
            <div class="item flex">
              <div>{{user.profile.address}}</div>
              <div>{{user.profile.zipcode}} {{user.profile.city}}</div>
            </div>
          </div>
        </div>
        <profile-edit-form id="profileForm" hidden\$="[[!editingProfile]]" user="{{user}}" on-profile-form-submit="submitEdit"></profile-edit-form>

        <hr>
        <div class="layout horizontal center">
          <iron-icon icon="communication:email" item-icon=""></iron-icon>
          <div class="item flex">
            <div>{{user.email}}</div>
          </div>
        </div>

        <hr>
        <div class="layout horizontal center" hidden\$="[[editingPassword]]">
          <iron-icon icon="icons:lock" item-icon=""></iron-icon>
          <div class="item flex">
            <div>●●●●●●●●●●●●</div>
          </div>
        </div>
        <div class="layout horizontal center" hidden\$="[[!editingPassword]]">
          <iron-icon icon="icons:lock" item-icon=""></iron-icon>
          <lancie-form id="passwordForm" class="flex" refurl="users/current/password" on-response="onPasswordUpdate">
            <paper-input label="Current Password" name="oldPassword" type="password" value="{{currentPassword}}" required=""></paper-input>
            <lancie-passwords name="newPassword"></lancie-passwords>
          </lancie-form>
        </div>
      </div>

      <div class="card-actions" hidden\$="[[isEditing(editingProfile, editingPassword)]]">
        <paper-icon-button on-tap="switchProfileForm" icon="icons:create" id="edit-profile"></paper-icon-button>
        <paper-tooltip for="edit-profile" offset="0" animation-delay="1">Edit your profile</paper-tooltip>
        <paper-icon-button on-tap="switchPasswordForm" icon="icons:lock" id="change-password"></paper-icon-button>
        <paper-tooltip for="change-password" offset="0" animation-delay="1">Change your password</paper-tooltip>
      </div>
      <div class="card-actions" hidden\$="[[!isEditing(editingProfile, editingPassword)]]">
        <paper-icon-button on-tap="resetForms" icon="icons:clear" id="closeIcon"></paper-icon-button>
        <paper-tooltip for="closeIcon" offset="0" animation-delay="1">Cancel</paper-tooltip>
        <paper-icon-button on-tap="submitEdit" icon="icons:check" id="checkIcon"></paper-icon-button>
        <paper-tooltip for="checkIcon" offset="0" animation-delay="1">Save changes</paper-tooltip>
      </div>
    </paper-card>
`,

  is: 'my-area-profile',

  properties: {
    user: Object,
    editingProfile: {
      type: Boolean,
      value: false
    },
    editingPassword: {
      type: Boolean,
      value: false
    },
    currentPassword: {
      type: String
    }
  },

  switchProfileForm: function() {
    this.editingProfile = !this.editingProfile;
  },

  switchPasswordForm: function() {
    this.editingPassword = !this.editingPassword;
  },

  resetForms: function() {
    this.editingProfile = false;
    this.editingPassword = false;
  },

  submitEdit: function() {
    if (this.editingProfile) {
      if (this.$.profileForm.validateAndSubmit()) {
        this.switchProfileForm();
      }
    }

    if (this.editingPassword) {
      if (this.$.passwordForm.validateAndSubmit()) {
        this.switchPasswordForm();
      }
    }
  },

  onPasswordUpdate: function(e, request) {
    if (request.succeeded) {
      this.fire('toast', {text: 'Password updated.'});
    } else {
      if (request.request.status === 403) {
        this.fire('toast', {text: 'Wrong password.'});
      } else {
        this.fire('toast', {text: 'Password update failed.'});
      }
    }
  },

  isEditing: function(editingProfile, editingPassword) {
    return editingProfile || editingPassword;
  },

  _checkEmpty: function(value) {
    return value || 'Not yet filled in, please click the pencil icon in the bottom left to complete your profile.';
  }
});
