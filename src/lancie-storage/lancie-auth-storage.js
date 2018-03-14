import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import '../../../../lancie-form/lancie-form.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <app-localstorage-document id="storage" key="auth" data="{{auth}}" session-only=""></app-localstorage-document>

    <lancie-ajax id="currentUser" refurl="users/current" on-lancie-ajax="onCurrentUser"></lancie-ajax>

    <lancie-ajax id="ajax"></lancie-ajax>
    <lancie-form id="form"></lancie-form>
`,

  is: 'lancie-auth-storage',

  properties: {
    user: {
      type: Object,
      notify: true,
    },
    auth: {
      type: Object,
      observer: '_changed',
      value: function() {
        return {};
      }
    },
    initial: {
      type: Boolean,
      value: true
    },
  },

  getToken: function() {
    return this.auth && this.auth.token;
  },

  storeToken: function(token) {
    this.initial = false;
    this.auth = {
      token: token
    };
  },

  onCurrentUser: function(e, request) {
    // If the request fails, no further action is required. The token has expired and is no longer valid. The user is required to log in as usual.
    if (request.succeeded) {
      if (request.response.message === 'Not logged in') {
        this.auth = {};
        return;
      }
      this.$.ajax.injectToken(this.auth.token);
      this.$.form.injectToken(this.auth.token);
      this.user = request.response;
    } else {
      // Old token can be cleared when the token is no longer valid
      this.auth = {};
    }
  },

  _changed: function(auth) {
    var token = this.getToken();
    if (this.initial && token && !this.user) {
      this.$.currentUser.token = token;
      this.initial = false;
      this.$.currentUser.generateRequest();
    }
  }
});
