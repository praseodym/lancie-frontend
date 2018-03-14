import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/marked-element/marked-element.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <style>
    :host {
      display: block;
      letter-spacing: 1px;
    }

    .layout ::content > * {
      width: 100%;
    }

    .container {
      font-weight: 300;
      line-height: 24px;
    }

    .content {
      max-width: 1032px;
      margin: 0 auto;
      padding: 32px;
    }

    .full .content {
      max-width: none;
    }

    .no-padding .content {
      padding: 0;
    }

    h1 {
      font-size: 36px;
      font-weight: 300;
      line-height: 48px;
      margin: 0 0 16px 0;
      text-align: left;
    }

    p {
      text-align: justify;
    }

    .primary {
      background-color: #eeecec;
      color: rgba(0, 0, 0, 0.87);
    }

    .primary h1 {
      color: var(--primary-color);
    }

    .secondary {
      background-color: var(--primary-color);
      color: rgba(255, 255, 255, 0.87);
    }

    .secondary h1 {
      color: var(--secondary-color);
    }

    @media(max-width: 1017px) {
      .content {
        padding: 30px 8px;
      }
    }
    </style>
    <div class\$="[[_setType(type)]]">
      <div class="content">
        <h1>[[header]]</h1>
        <slot></slot>
      </div>
    </div>
`,

  is: 'lancie-section',

  properties: {
    type: {
      type: String,
      value: 'primary',
      notify: true
    },
    header: {
      type: String,
      value: '',
      notify: true
    }
  },

  _setType: function() {
    return 'container ' + this.type;
  }
});
