import '../../../../@polymer/paper-material/paper-material.js';
import '../../../../@polymer/paper-input/paper-input.js';
import '../../../../@polymer/paper-input/paper-textarea.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../lancie-card/lancie-card.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import '../../../../lancie-error/lancie-error.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

Polymer({
  _template: `
    <style>
      :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      paper-button {
        display: block;
        margin: auto;
        width: 90%;
        color: var(--secondary-color);
        background-color: var(--primary-color);
        text-align: center;
      }
    </style>

    <lancie-ajax id="ajaxContact" refurl="mail/contact" method="POST" on-lancie-ajax="onContact"></lancie-ajax>

    <lancie-card heading="Send us an email!">
      <div class="card-content">
        <lancie-error id="error"></lancie-error>

        <paper-input id="email" type="email" label="Your email address" value="{{email}}" error-message="Email should be valid." auto-validate=""></paper-input>
        <paper-input id="subject" label="Subject" value="{{subject}}" minlength="5" maxlength="100" error-message="Subject too short." auto-validate=""></paper-input>
        <paper-textarea id="message" label="Message" value="{{message}}" placeholder="Enter your message here." rows="4" minlength="100" error-message="Message too short." auto-validate=""></paper-textarea>
      </div>
      <div class="card-actions">
        <paper-button on-tap="tryContact" raised="">Send email</paper-button>
      </div>
    </lancie-card>
`,

  is: 'lancie-contact',

  properties: {
    email: String,
    subject: String,
    message: String
  },

  tryContact: function() {
    this.$.error.clear();
    if (this.validateContact()) {
      this.$.ajaxContact.body = {
        sender: this.email,
        subject: this.subject,
        message: this.message
      };

      this.$.ajaxContact.generateRequest();
    }
  },

  onContact: function(e, response) {
    if (response.succeeded) {
      this.email = '';
      this.subject = '';
      this.message = '';
      this.fire('navigate', {page: 'contact-success'});
    } else {
      this.$.error.setError('Server failed processing the request, please try refreshing the page.');
    }
  },

  validateContact: function() {
    if (!this.email || !this.subject || !this.message) {
      this.$.email.validate();
      this.$.subject.validate();
      this.$.message.validate();
      return false;
    }

    // return true if nothing is invalid, false otherwise
    return !(this.$.email.invalid || this.$.subject.invalid || this.$.message.invalid);

  }
});
