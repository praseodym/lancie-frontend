import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/iron-media-query/iron-media-query.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import './lancie-commission-icons.js';
import '../../../../@polymer/paper-material/paper-material.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
      :host {
        margin: 5px;
      }

      .small-device {
        width: calc(100% - 10px);
      }

      iron-icon {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        padding: 14px 14px;
        width: 30px;
        height: 30px;
      }

      .member-desc {
        padding: 5px 10px;
      }

      h2, h3 {
        margin: 0;
      }

      h2 {
        font-weight: 300;
        font-size: 19px;
      }

      h3 {
        font-size: 14px;
        line-height: 1em;
        font-weight: 100;
      }
    }
    </style>

    <iron-media-query query="max-width: 530px" query-matches="{{small}}"></iron-media-query>

    <paper-material elevation="1" class\$="[[_computeClass(small)]]">
      <iron-icon icon="commission:[[commissioner.icon]]"></iron-icon>
      <div class="member-desc layout flex self-center">
        <h2>[[commissioner.name]]</h2>
        <h3>[[commissioner.function]]</h3>
      </div>
    </paper-material>
`,

  is: 'lancie-commission-member',

  properties: {
    commissioner: {
      type: Object
    }
  },

  _computeClass: function(small) {
    return 'layout horizontal commission-member stretch' + (small ? ' small-device' : '');
  }
});
