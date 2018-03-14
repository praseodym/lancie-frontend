import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/paper-button/paper-button.js';
import '../../../../lancie-login-form/lancie-login-form.js';
import { Element } from '../../../../@polymer/polymer/polymer-element.js';
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class LancieLogin extends Element {
  static get template() {
    return `
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
        margin: auto;
        max-width: 400px;
      }

      h2 {
        margin: 0;
      }

      paper-button {
        margin-top: 4px;
        background-color: var(--primary-color);
        color: var(--secondary-color);
      }

      paper-button > iron-icon {
        margin-right: 4px;
      }

      .actions {
        text-align: center;
      }
    </style>

    <h2>[[_getAction(registering)]]</h2>
    <div class="card-content">
      <lancie-login-form id="loginForm" registering="[[registering]]" order-id="[[orderId]]" on-enter="submit"></lancie-login-form>
    </div>
    <div class="actions">
      <paper-button raised="" on-tap="switchForm"><iron-icon icon="lancie:cached"></iron-icon>Switch to [[_getSwitchAction(registering)]]</paper-button>
    </div>
`;
  }

  static get is() {
    return 'lancie-login';
  }

  static get properties() {
    return {
      registering: {
        type: Boolean,
        value: false,
        notify: true,
      },
      orderId: String,
    };
  }

  switchForm() {
    this.$.loginForm.clearError();
    this.registering = !this.registering;
  }

  submit() {
    if (this.registering) {
      this.register();
    } else {
      this.login();
    }
  }

  register() {
    this.$.loginForm.tryRegister();
  }

  login() {
    this.$.loginForm.tryLogIn();
  }

  _getAction(registering) {
    return registering ? 'Register' : 'Log In';
  }

  _getSwitchAction(registering) {
    return this._getAction(!registering);
  }
}

customElements.define(LancieLogin.is, LancieLogin);
