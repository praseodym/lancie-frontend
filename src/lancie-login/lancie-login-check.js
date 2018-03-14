import '../../../../@polymer/polymer/polymer.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import '../../../../lancie-login-card/lancie-login-card.js';
import '../../../../lancie-form/lancie-form.js';
import { Templatize } from '../../../../@polymer/polymer/lib/utils/templatize.js';
import { Element } from '../../../../@polymer/polymer/polymer-element.js';

var checks = [];

class LancieLoginCheck extends Element {
  static get template() {
    return `
  <style>
    :host {
      display: block;
    }
  </style>

  <lancie-login-card id="loginForm"></lancie-login-card>

  <lancie-ajax id="ajax"></lancie-ajax>
  <lancie-form id="form"></lancie-form>

  <slot id="slot"></slot>
`;
  }

  static get is() {
    return 'lancie-login-check';
  }

  static get properties() {
    return {
      user: {
        type: Object
      },
      nologin: {
        type: Boolean,
        value: false
      },
      instance: Object,
      callbackFunction: Function,
    };
  }

  static get observers() {
    return [
      '_canAccess(instance, user, nologin)'
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.callbackFunction = checks.push((newUser) => {
      this.user = newUser;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    checks.splice(checks.indexOf(this.callbackFunction), 1);
  }

  constructor() {
    super();
    this.addEventListener('logged-in', e => {this.storeUser(e, e.detail);});
  }

  _canAccess(instance, user, nologin) {
    if (!instance && (nologin || (user && user !== ''))) {
      let template = this.$.slot.assignedNodes().find((element) => element.nodeName.toLowerCase() === 'template');
      let TemplateClass = Templatize.templatize(template, this, {
        forwardHostProp(prop, value) {
          if(this.instance) {
            this.instance.forwardHostProp(prop, value);
          }
        },
        notifyInstanceProp(instance, property, value) {
          this.notifyPath(property);
        },
        instanceProps: {
          user: true,
        }});
      this.instance = new TemplateClass({user: user});

      this.$.loginForm.style.display = 'none';
      this.shadowRoot.appendChild(this.instance.root);
    } else if (user) {
      this.instance.user = user;
    }
  }

  storeUser(e, detail) {
    this.$.ajax.injectToken(detail.token);
    this.$.form.injectToken(detail.token);

    this.dispatchEvent(new CustomEvent('store-token', {detail: {token: detail.token, user: detail.user}, bubbles: true, composed: true}));

    this.user = detail.user;
    for (var i = 0; i < checks.length; i++) {
      checks[i](this.user);
    }
  }
}

customElements.define(LancieLoginCheck.is, LancieLoginCheck);
