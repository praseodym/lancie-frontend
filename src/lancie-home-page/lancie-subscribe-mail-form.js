import '../../../../@polymer/polymer/polymer-element.js';
import '../../../../lancie-error/lancie-error.js';
import '../../../../lancie-form/lancie-form.js';
import '../../../../@polymer/iron-icons/iron-icons.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../../@polymer/paper-input/paper-input.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <style>
      lancie-form.mail-input {
        max-width: 500px;
      }

      lancie-form.mail-input iron-icon {
        margin-right: 12px;
      }
    </style>

    <lancie-form id="mailForm" refurl="subscriptions" method="POST" class="mail-input" on-response="onResponse">
      <lancie-error id="alert"></lancie-error>
      <paper-input label="E-Mail" name="email" class="mail-input" value="{{email}}" on-keydown="onEnter">
        <iron-icon icon="mail" slot="prefix"></iron-icon>
        <paper-icon-button slot="suffix" on-tap="clearInput" icon="clear" alt="clear" title="Clear"></paper-icon-button>
      </paper-input>
      <paper-button disabled="[[!email]]" on-tap="trySubmit">Sign up</paper-button>
    </lancie-form>
`,

  is: 'lancie-subscribe-mail-form',

  properties: {
    email: {
      type: String,
      value: function() { return ''; }
    }
  },

  trySubmit: function() {
    this.$.alert.clear();
    this.$.mailForm.validateAndSubmit();
  },

  onEnter: function(e) {
    if (e.keyCode === 13) {
      this.trySubmit();
    }
  },

  onResponse: function(event, request) {
    if (request.succeeded) {
      this.clearInput();
      this.$.alert.setSuccess('Thank you for signing up!');
    } else {
      if (request.request.status === 400 || request.request.status === 409) {
        this.$.alert.setError(request.request.response.message);
      } else {
        this.fire('refresh-toast');
      }
    }
  },

  clearInput: function() {
    this.$.mailForm.reset();
  }
});
