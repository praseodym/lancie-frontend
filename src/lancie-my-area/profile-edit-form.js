import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/paper-input/paper-input.js';
import '../../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../../@polymer/paper-item/paper-icon-item.js';
import '../../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../../@polymer/neon-animation/web-animations.js';
import '../../../../@polymer/iron-icons/communication-icons.js';
import '../../../../@polymer/iron-icons/social-icons.js';
import '../../../../@polymer/paper-item/paper-item.js';
import '../../../../lancie-form/lancie-form.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
'use strict';

Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment iron-flex-factors">
      :host {
        display: block;
        --paper-input-min-width: 200px;
      }

      iron-icon {
        margin-right: 8px;
        min-width: 24px;
      }

      paper-input, paper-dropdown-menu {
        min-width: var(--paper-input-min-width);
        margin-right: 50px;
      }

      paper-input ::content input::-webkit-inner-spin-button {
        display: none;
      }

      /*
      Workaround for a bug that causes paper-input
      with type="date" not being editable when empty
      (PolymerElements/paper-input/issues/352).
      */
      paper-input[type="date"] {
        --paper-input-container-input: {
          min-height: 1px;
        };
      }

      .dropdown-content {
        min-width: 200px;
      }

      /*
      * Safari hack
      * Makes flex wrapping work
      */
      .flex, .flex-1, .flex-2, .flex-3 {
        flex-basis: var(--card-min-width);
      }
      /*End Safari hack*/
    </style>

    <lancie-form id="form" refurl="users/current/profile" on-response="onProfileUpdate" no-reset="" on-enter="fireSubmitEvent">
      <div class="layout horizontal center">
        <iron-icon icon="icons:account-circle" item-icon=""></iron-icon>
        <div class="layout horizontal wrap flex">
          <paper-input label="First Name" name="firstName" type="text" value="{{profile.firstName}}" class="flex" required=""></paper-input>
          <paper-input label="Last Name" name="lastName" type="text" value="{{profile.lastName}}" class="flex" required=""></paper-input>
          <paper-input label="Display Name" name="displayName" type="text" value="{{profile.displayName}}" required=""></paper-input>
          <paper-dropdown-menu class="flex" label="Gender" name="gender" required="">
            <paper-listbox class="dropdown-content" slot="dropdown-content" selected="{{user.profile.gender}}" attr-for-selected="data-value">
              <paper-item data-value="MALE">MALE</paper-item>
              <paper-item data-value="FEMALE">FEMALE</paper-item>
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
      </div>
      <div class="layout horizontal center">
        <iron-icon icon="social:cake" item-icon=""></iron-icon>
        <div class="item flex">
          <paper-input label="Birthday" name="birthday" type="date" placeholder="YYYY-MM-DD" value="{{profile.birthday}}" required=""></paper-input>
        </div>
      </div>
      <div class="layout horizontal center">
        <iron-icon icon="communication:phone" item-icon=""></iron-icon>
        <div class="flex">
          <paper-input label="Phone Number" name="phoneNumber" type="text" value="{{profile.phoneNumber}}" required=""></paper-input>
        </div>
      </div>
      <div class="layout horizontal center">
        <iron-icon icon="communication:location-on" item-icon=""></iron-icon>
        <div class="layout horizontal wrap flex">
          <paper-input label="Address" name="address" type="text" value="{{profile.address}}" class="flex-3" required=""></paper-input>
          <paper-input label="Zipcode" name="zipcode" type="text" value="{{profile.zipcode}}" class="flex" required=""></paper-input>
          <paper-input label="City" name="city" type="text" value="{{profile.city}}" class="flex-3" required=""></paper-input>
        </div>
      </div>
    </lancie-form>
`,

  is: 'profile-edit-form',

  properties: {
    user: {
      type: Object,
      observer: '_changed',
    },
    profile: Object,
  },

  validateAndSubmit: function() {
    return this.$.form.validateAndSubmit();
  },

  validate: function() {
    return this.$.form.validate();
  },

  onProfileUpdate: function(e, request) {
    if (request.succeeded) {
      this.set('user.profile', request.response.object);
      this.fire('toast', {text: 'Profile updated successfully.'});
      this.fire('profile-submitted');
    } else {
      if (request.request.status === 409) {
        this.fire('toast', {text: 'Displayname already in use.'});
      } else {
        this.fire('toast', {text: 'Profile updated failed.'});
      }
      this.set('profile', this.user.profile);
    }
  },

  _changed: function(user) {
    if (!!user && !this.profile) {
      this.profile = user.profile;
    }
  },

  fireSubmitEvent: function () {
      this.fire('profile-form-submit');
  }
});
