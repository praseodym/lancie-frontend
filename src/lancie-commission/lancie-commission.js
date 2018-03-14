import '../../../../@polymer/polymer/polymer.js';
import '../../../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../../../@polymer/iron-ajax/iron-ajax.js';
import '../../../../lancie-ajax/lancie-ajax.js';
import '../../../../@polymer/iron-media-query/iron-media-query.js';
import '../../../../@polymer/paper-material/paper-material.js';
import './lancie-commission-member.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
      :host {
        display: block;
      }

      p {
        margin-top: 0px;
        text-align: justify;
      }

      .textual, .visual {
        display: inline-block;
      }

      .textual {
        margin-right: 16px;
        max-width: 40%;
      }

      .visual {
        max-width: calc(60% - 16px);
      }

      .small {
        max-width: 100%;
      }

      .wrapper {
        display: flex;
      }

      lancie-commission-member {
        width: calc(50% - 10px);
        margin: 5px;
      }

      lancie-commission-member.small-device {
        width: calc(100% - 10px);
      }

      @media (max-width: 600px) {
        lancie-commission-member {
          width: 100%;
        }
      }
    </style>

    <lancie-ajax id="ajaxCommittee" refurl="web/committee" handle-as="json" on-lancie-ajax="onCommittee"></lancie-ajax>

    <iron-media-query query="max-width: 950px" query-matches="{{small}}"></iron-media-query>
    <iron-media-query query="max-width: 600px" query-matches="{{smalldevice}}"></iron-media-query>

    <div class="layout horizontal wrap">
      <div class\$="{{_computeSmall('textual', small)}}">
        <p>The LANcie is the committee that organizes Area FiftyLAN each
          year. It's our job to make sure everything goes to plan and that
          all potential problems are taken care of. We don't bite, so don't hesitate
          to contact us with a good story, some questions or just a casual
          conversation about gaming. We're always open to feedback and fun
          ideas. We hope to see you at the event!</p>
        <p>If you have any questions or are interested in sponsoring the
          event, please send an email with our <a href="/contact">contact form</a>.</p>
      </div>
      <div class\$="{{_computeSmall('visual', small)}}">
        <div class="layout horizontal wrap start-justified">
          <template is="dom-repeat" items="[[commission]]" as="commissioner" sort="_computeSort">
            <lancie-commission-member commissioner="[[commissioner]]" class\$="[[_computeSmallDevice(smalldevice)]]"></lancie-commission-member>
          </template>
        </div>
      </div>
    </div>
`,

  is: 'lancie-commission',

  properties: {
    commission: {
      type: Array,
      value: []
    }
  },

  attached: function() {
    this.$.ajaxCommittee.generateRequest();
  },

  onCommittee: function(e, request) {
    if (request.succeeded) {
      this.commission = request.response.object;
    }
  },

  _computeSmall: function(clazz, isSmall) {
    return clazz + (isSmall ? ' small' : '');
  },

  _computeSmallDevice: function(isSmall) {
    return isSmall ? 'small-device' : '';
  },

  _computeSort: function(a, b) {
    if (a.position === b.position) {
      return 0;
    }
    return a.position > b.position ? 1 : -1;
  }
});
